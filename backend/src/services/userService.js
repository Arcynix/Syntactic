const pool = require('../config/db');

class UserService {
    async createUser(userData) {
        const { email, username, password_hash } = userData;
        const [result] = await pool.execute(
            'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
            [email, username, password_hash]
        );
        return result.insertId;
    }

    async updateUnverifiedUser(userId, username, password_hash) {
        await pool.execute(
            'UPDATE users SET username = ?, password_hash = ? WHERE id = ?',
            [username, password_hash, userId]
        );
    }

    async saveOtp(userId, otp, expiresAt) {
        await pool.execute(
            'UPDATE users SET otp_code = ?, otp_expires_at = ? WHERE id = ?',
            [otp, expiresAt, userId]
        );
    }

    async getOtp(userId) {
        const [rows] = await pool.execute(
            'SELECT otp_code, otp_expires_at FROM users WHERE id = ?',
            [userId]
        );
        return rows[0];
    }

    async markVerified(userId) {
        await pool.execute(
            'UPDATE users SET is_verified = TRUE, otp_code = NULL, otp_expires_at = NULL WHERE id = ?',
            [userId]
        );
    }

    async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    async findByUsername(username) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    async updateLastLogin(id) {
        await pool.execute('UPDATE users SET last_login = NOW(), failed_login_attempts = 0, lockout_until = NULL WHERE id = ?', [id]);
    }

    async incrementFailedLogin(id) {
        await pool.execute('UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = ?', [id]);
    }

    async lockAccount(id) {
        const lockoutTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await pool.execute('UPDATE users SET lockout_until = ? WHERE id = ?', [lockoutTime, id]);
    }

    async createPasswordResetToken(userId, tokenHash) {
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await pool.execute(
            'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
            [userId, tokenHash, expiresAt]
        );
    }

    async findValidResetToken(tokenHash) {
        const [rows] = await pool.execute(
            'SELECT * FROM password_reset_tokens WHERE token_hash = ? AND expires_at > NOW()',
            [tokenHash]
        );
        return rows[0];
    }

    async deleteResetTokens(userId) {
        await pool.execute('DELETE FROM password_reset_tokens WHERE user_id = ?', [userId]);
    }

    async updatePassword(userId, newPasswordHash) {
        await pool.execute('UPDATE users SET password_hash = ? WHERE id = ?', [newPasswordHash, userId]);
    }

    async getProfile(userId) {
        const [rows] = await pool.execute('SELECT u.id, u.email, u.username, u.created_at, p.full_name, p.bio, p.avatar_url, p.location, p.website FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = ?', [userId]);
        return rows[0];
    }

    async updateProfile(userId, profileData) {
        const { full_name, bio, avatar_url, location, website } = profileData;

        // Upsert (Insert or Update)
        const sql = `
            INSERT INTO user_profiles (user_id, full_name, bio, avatar_url, location, website)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            full_name = VALUES(full_name),
            bio = VALUES(bio),
            avatar_url = VALUES(avatar_url),
            location = VALUES(location),
            website = VALUES(website)
        `;

        await pool.execute(sql, [
            userId,
            full_name || null,
            bio || null,
            avatar_url || null,
            location || null,
            website || null
        ]);
        return this.getProfile(userId);
    }
}

module.exports = new UserService();
