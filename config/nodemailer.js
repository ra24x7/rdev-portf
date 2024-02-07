import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;



export const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass,
    }
});

export const mailOptions = {
   from: '"Rajat Portfolio" <' + email + '>',
    to: email,
}