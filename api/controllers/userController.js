const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  const response = await User.find();

  res.status(200).json({
    status: "success",
    users: response,
  });
};

exports.createUser = async (req, res, next) => {
  const { name, email } = req.body;

  const response = await User.create({ name, email });
  return res.status(200).json({
    status: "success",
    user: response,
  });
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  console.log(req.body);

  if (req.body.password || req.body.passwordConfirm) return;

  const response = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  console.log(response);
  return res.status(200).json({ status: "success", data: response });
};
