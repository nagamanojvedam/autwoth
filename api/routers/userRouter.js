const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.get("/logout", authController.userLogout);
router.post("/send-token", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);

router.route("/").get(userController.getAllUsers);
router.route("/:userId").patch(userController.updateUser);

module.exports = router;
