import { transport } from "../utils/transport.js";

export const sendMail = async (email, subject, sendDescription) => {
  await transport.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: sendDescription,
  });
};

export const emailTemplate = (verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="font-family: Arial, sans-serif; background: #f4f7fb; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 12px; text-align: center;">
          <h1 style="color: #2563eb;">Welcome Aboard!</h1>
          <h2>Verify Your Email</h2>
          <p>Please verify your email address to complete your registration.</p>

          <a href="${verificationUrl}"
             style="display: inline-block; background: #2563eb; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px;">
            Verify My Email
          </a>

          <p style="color: #6b7280; font-size: 13px;">
            If you didn't create this account, you can ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
};