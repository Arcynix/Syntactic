const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendPasswordReset(email, resetUrl) {
        console.log('==================================================');
        console.log('📨 MOCK EMAIL: PASSWORD RESET');
        console.log(`To: ${email}`);
        console.log(`Reset Link: ${resetUrl}`);
        console.log('==================================================');
    }

    async sendOtp(email, otp) {
        console.log('==================================================');
        console.log('📨 MOCK EMAIL: VERIFICATION OTP');
        console.log(`To: ${email}`);
        console.log(`OTP Code: ${otp}`);
        console.log('==================================================');
    }
}

module.exports = new EmailService();
