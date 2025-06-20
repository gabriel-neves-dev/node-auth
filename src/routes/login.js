const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  checkAuthenticated,
  checkNotAuthenticaded,
} = require("../middlewares/authMiddlewares.js");

router.get("/", checkAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
module.exports = router;
