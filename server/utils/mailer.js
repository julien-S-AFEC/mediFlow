import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_APP_PASSWORD
    }
});

export default async function sendEmail({ to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from: `"Medi Flow" ${process.env.MAILER_USER}`,
            to,
            subject,
            html,
        });
    } catch (error) {
        throw new Error(`Erreur lors de l’envoi de l’email, ${error.message}`);
    }
};