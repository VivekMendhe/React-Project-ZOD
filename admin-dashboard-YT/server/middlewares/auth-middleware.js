require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const key = process.env.SECRET_KEY;

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, key, (error, valid) => {
      if (error) {
        res
          .status(401)
          .send({ success: false, message: "Please provide a valid token!" });
      }
      next();
    });
  } else {
    res
      .status(403)
      .send({ success: false, message: "Please add token with headers!" });
  }
};

module.exports.authMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, key, async (error, valid) => {
      if (error) {
        res
          .status(401)
          .send({ success: false, message: "Please provide a valid token!" });
      }
      try {
        const user = await UserModel.findOne({ email: valid.user.email });
        if (user) {
          req.user = user.toObject();
          next();
        } else {
          res.status(401).send({ success: false, message: "User not found!" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ success: true, message: "Internal Server Error!" });
      }
    });
  } else {
    res
      .status(403)
      .send({ success: false, message: "Please add token with header!" });
  }
};
