const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");

const signToken = (id) =>
  jwt.sign({ id, code: "Autwoth Code" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendJWT = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.userLogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) throw Error("Please Provide all the folds");

    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password, user.password)))
      throw Error("Incorrect email or password");

    createAndSendJWT(user, 200, req, res);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.userSignup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    createAndSendJWT(newUser, 201, req, res);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.userLogout = async (req, res, next) => {
  try {
    res.cookie("jwt", "You are logged out", {
      expires: new Date(Date.now() + 3 * 1000),
      httpOnly: true,
    });
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = await promisify(jwt.verify)(
      res.cookies.jwt,
      process.env.JWT_SECRET
    );
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) throw Error("no user found");

    if (currentUser.changedPasswordAfter(decoded.iat))
      return res.status(400).json({
        status: "success",
        user: currentUser,
      });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) throw Error("No token exists! Please login");

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) throw Error("User does not exists");

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw Error("user changed password, Please login again");
    }

    req.user = currentUser;
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } finally {
    next();
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(400).json({
        status: "error",
        message: "user does not have access/permission to perform this action",
      });
      throw new Error("No User Access");
    }
    next();
  };

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("There is no user with provided email address.");

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      token: resetToken,
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.error(err.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) throw Error("Token is invalid or has expired");

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(200).json({
      status: "error",
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!(await user.isPasswordCorrect(req.body.password, user.password)))
    throw Error("invalid password");

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  createAndSendJWT(user, 200, req, res);
};
