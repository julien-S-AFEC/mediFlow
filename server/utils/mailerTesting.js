import sendEmail from "./mailer.js";

const test = async () => {
    await sendEmail({
        to: "soutade.julien.td@gmail.com",
        subject: 'Account verification.',
        html: `<p>Hello "Julien",</p>
             <pThank you for signing up. Click on the link below to check your account:</p>
             `
    });
}

export default test