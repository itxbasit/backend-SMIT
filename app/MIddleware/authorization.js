import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "You aren't authorize" });
    }

    const decoded = jwt.verify(token, process.env.accessToken);

    req.user = decoded;
    next();
    // return res.status(401).send({ msg: "You aren't authorize" });
  } catch (err) {
    return res.status(401).send({ msg: "Invalid or expired token" });
  }
};

export const verifyMiddleware = (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(401).send({ msg: "You aren't authorize" });
    }

    const decoded = jwt.verify(token, process.env.verifyToken);

    if(decoded.purpose != "email_verification"){
      return res.status(401).send({ msg: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ msg: "Invalid or expired token" });
  }
};