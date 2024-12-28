import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'rifatswd@gmail.com',
      pass: 'bhfc mmmh kujm rnms',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'rifatswd@gmail.com',
    to,
    subject: 'Change password request',
    text: 'Changed you password within 10 minutes',
    html,
  });
};
