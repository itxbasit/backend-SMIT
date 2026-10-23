import bcrypt from "bcrypt";
import Controller from "./auth.controller.js";
import {
  accessTokenGenerate,
  refreshTokenGenerate,
  verificationTokenGenerate,
} from "../utils/token.js";
import { emailTemplate, sendMail } from "../common/email.js";
import { uploadFile } from "../utils/uploadCloudinary.js";

const signUp = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(404).send({ msg: "Password is req" });
    }

    const password = await bcrypt.hash(req.body.password, 12);
    const data = await Controller.Create({ ...req.body, password });

    const URL = `${process.env.FRONTEND_URL}?token=${verificationTokenGenerate(data._id)}`;
    const email = emailTemplate(URL);
    await sendMail(data.email, "Email Verification", email);

    return res.status(201).send({ msg: "User Created Successfully" });
  } catch (err) {
    return res.status(404).send({ msg: err });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password && !email) {
      return res.status(404).send({ msg: "Password and email is req" });
    }
    let data = await Controller.FindOne({ email });

    if (!data) {
      return res.status(404).send({ msg: "Email isn't found" });
    }

    const authenticate = await bcrypt.compare(password, data.password);
    if (!authenticate) {
      return res.status(404).send({ msg: "Password isn't correct" });
    }

    if (!data.verified) {
      const URL = `${process.env.FRONTEND_URL}?token=${verificationTokenGenerate(data._id)}`;
      const email = emailTemplate(URL);
      await sendMail(data.email, "Email Verification", email);
      return res
        .status(404)
        .send({ msg: "You aren't verified we send a link to your email" });
    }
    data = data.toObject();

    delete data.password;

    const accessToken = accessTokenGenerate(data._id, data.type);
    const refreshToken = refreshTokenGenerate(data._id, data.type);

    return res.status(201).send({
      msg: "User login sucessfully",
      data: { user: data, accessToken, refreshToken },
    });
  } catch (err) {
    return res.status(404).send({ msg: err });
  }
};

const me = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await Controller.FindById({ _id: userId });

    return res.status(201).send({
      msg: "User login sucessfully",
      data: user,
    });
  } catch (err) {
    return res.status(404).send({ msg: err });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId } = req.user;

    await Controller.FindByIdUpdated(userId, { verified: true });

    return res.status(200).send({
      msg: "User updated sucessfully",
    });
  } catch (err) {
    return res.status(404).send({ msg: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;

    let profileUrl = null;
    const data = await Controller.FindById(userId);
    if (!data) {
      return res.status(404).send({ msg: "User not found" });
    }

    if (req.file) {
      const { url } = await uploadFile(req.file.buffer);
      profileUrl = url;
    }

    const d = await Controller.FindByIdUpdated(userId, { profileUrl });

    return res.status(201).send({
      msg: "User Updated sucessfully",
      data: { user: d},
    });
  } catch (err) {
    console.log(err)
    return res.status(404).send({ msg: err });
  }
};
export default {
  signUp,
  login,
  me,
  verifyEmail,
  updateUser,
};
