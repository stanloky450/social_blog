
const express = require("express");
const {signup, signin, signout,forgotPassword,resetPassword, socialLogin} = require("../controllers/auth");
const {userSignupValidator,  passwordResetValidator} = require("../validators/post");
const {userById} = require("../controllers/user");
const router = express.Router();

router.post("/signup",   signup);
router.post("/signin",  signin);

router.get("/signout",  signout);
// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
// then use this route for social login
router.post("/social-login", socialLogin);

// any route containing  :userId. our app will fist execute userById
router.param("userId", userById);

module.exports = router;