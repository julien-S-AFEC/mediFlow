import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

export default async function sendEmail({ to, subject, html }) {
    try {
        await transporter.sendMail({
            from: `"Medi Flow" ${process.env.MAILER_USER}`,
            to,
            subject,
            html,
        });
    } catch (error) {
        throw new Error(`Erreur lors de l’envoi de l’email, ${error.message}`);
    }
};