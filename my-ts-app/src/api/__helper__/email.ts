import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
    console.log("on passe a node mailer")
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'flausson@normandiewebschool.fr',
      pass: 'kwhzdxhkhuyqeefw',
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