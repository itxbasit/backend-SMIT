import jwt from "jsonwebtoken";

export const accessTokenGenerate = (userId, type) => {
  const token = jwt.sign({userId, type}, process.env.accessToken, { expiresIn: "15m"});
  return token;
};

export const refreshTokenGenerate = (userId, type) => {
  const token = jwt.sign({userId, type}, process.env.refreshToken, { expiresIn: "15m"});
  return token;
};

export const verificationTokenGenerate = (userId) => {
  const token = jwt.sign({userId, purpose: "email_verification"}, process.env.verifyToken, { expiresIn: "15m"});
  console.log(token)
  return token;
};