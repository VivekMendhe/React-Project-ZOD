require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailRexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const key = process.env.SECRET_KEY;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a valid email address!"],
    validate: {
      validator: function (value) {
        return emailRexPattern.test(value);
      },
    },
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters!"],
    maxlength: [200, "Password must be at most 200 characters!"],
    // select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(this.password, password);
};

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      key,
      { expiresIn: "15min" }
    );
  } catch (error) {
    console.error(error);
  }
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
