const express = require("express");

const authController = require("./auth.controller");
const validate = require("../../middleware/validate");
const { loginSchema } = require("./auth.validation");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const permission = require("../../middleware/permission");

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


router.get(
  "/test-role",
  authenticate,
  authorize("SUPER_ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Role authorization successful",
      data: req.user
    });
  }
);

router.get(
  "/test-permission",
  authenticate,
  permission("user.read"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Permission authorization successful",
      data: req.user
    });
  }
);



module.exports = router;