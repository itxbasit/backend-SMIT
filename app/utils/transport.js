
import "dotenv/config";
import nodemailer from "nodemailer";

const user = process.env.USER_EMAIL
const pass = process.env.USER_PASSWORD

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});

transport.verify((error) => {
  if (error) {
    console.error("SMTP error:", error.message);
  } else {
    console.log("SMTP connection verified!");
  }
});
