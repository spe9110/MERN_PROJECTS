import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "spencernsituzola@gmail.com",
        pass: "ztwqdwaxeswkfaaa"
    },
    tls: {
        rejectUnauthorized: false // ⚠️ désactive la vérification SSL
    }
});