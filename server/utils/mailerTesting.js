import sendEmail from "./mailer.js";
import FormData from "form-data"; // form-data v4.0.1
// import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// const test = async () => {
//     await sendEmail({
//         to: "soutade.julien.td@gmail.com",
//         subject: 'Account verification.',
//         html: `<p>Hello "Julien",</p>
//              <pThank you for signing up. Click on the link below to check your account:</p>
//              `
//     });
// }



// async function sendSimpleMessage() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: "api",
//     key: process.env.API_KEY || "4a1434f3a0e48e7b2cab89c7868aee54-5a4acb93-392c8085",
//     // When you have an EU-domain, you must specify the endpoint:
//     // url: "https://api.eu.mailgun.net"
//   });
//   try {
//     const data = await mg.messages.create("sandbox56816325903d4c668c58bd92a673c576.mailgun.org", {
//       from: "Mailgun Sandbox <postmaster@sandbox56816325903d4c668c58bd92a673c576.mailgun.org>",
//       to: ["Soutade-Gastaud Julien <soutade.julien.td@gmail.com>"],
//       subject: "Hello Soutade-Gastaud Julien",
//       text: "Congratulations Soutade-Gastaud Julien, you just sent an email with Mailgun! You are truly awesome!",
//     });

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }

