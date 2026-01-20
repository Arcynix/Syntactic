const argon2 = require('argon2');
const crypto = require('crypto');

exports.hashPassword = async (password) => {
    return await argon2.hash(password, {
        type: argon2.argon2id,
    });
};

exports.verifyPassword = async (hash, password) => {
    return await argon2.verify(hash, password);
};

exports.createRandomToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    return { resetToken, passwordResetToken };
};
