import nodemailer from 'nodemailer';

const {
  MAIL_PASS = ' ',
} = process.env;


export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'flausson@normandiewebschool.fr',
      pass: MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
      },
  });

  const mailOptions = {
    from: 'flausson@normandiewebschool.fr',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}