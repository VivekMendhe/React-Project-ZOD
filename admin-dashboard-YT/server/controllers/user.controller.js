const UserModel = require("../models/user.model");
const ErrorHandler = require("../util/ErrorHandler");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isEmailExist = await UserModel.findOne({ email }).exec();
    if (isEmailExist) {
      return next(new ErrorHandler("User already exists!", 400));
    }

    const user = new UserModel({ email, password });
    await user.save();
    res
      .status(201)
      .send({ success: true, message: "User saved successfully!", user });
  } catch (error) {
    return next(new ErrorHandler("error.message", 400));
  }
};

module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return next(new ErrorHandler("Invalid email address!", 404));
    }

    const passwordMatcher = await bcrypt.compare(password, user.password);
    // const passwordMatcher = await user.comparePassword(password);

    if (passwordMatcher) {
      const { password, ...rest } = user.toObject();
      res.status(200).send({
        success: true,
        message: "Login successful!",
        user: rest,
        auth: await user.generateToken(),
      });
    } else {
      // Passwords do not match
      return next(new ErrorHandler("Invalid password!", 401));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500)); // Adjust the status code as needed
  }
};
