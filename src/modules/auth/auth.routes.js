const express = require("express");

const authController = require("./auth.controller");
const validate = require("../../middleware/validate");
const { loginSchema } = require("./auth.validation");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/refresh",
  authController.refresh
);

router.post(
  "/logout",
  authController.logout
);

router.get(
  "/me",
  authenticate,
  authController.getMe
);



module.exports = router;