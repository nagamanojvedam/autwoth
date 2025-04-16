const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String,
  phone: Number,
  freelance: { type: String, default: "Available" },
  password: String,
  passwordConfirm: String,
  passwordResetExpires: Date,
  passwordResetToken: String,
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.isPasswordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.isPasswordCorrect = async (currPassword, userPassword) => {
  return await bcrypt.compare(currPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.select("-password");
//   next();
// });

module.exports = mongoose.model("User", userSchema);
