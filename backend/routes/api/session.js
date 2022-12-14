const express = require("express");
const router = express.Router();
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  const token = await setTokenCookie(res, user);

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
});
router.get("/", restoreUser, async (req, res) => {
  const { user } = req;
  // const current = user.toSafeObject();
  // user.dataValues.imageUrl = "image.url";
  if (user) {
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      username: user.username,
    });
  } else return res.json({});
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
