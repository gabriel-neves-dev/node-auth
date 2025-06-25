const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticaded } = require('../middlewares/authMiddlewares.js');


router.get("/", checkNotAuthenticaded, (req, res) => {
  res.status(200).json({
    message: "Welcome to the Dashboard!",
  });
  // res.render("dashboard", { user: req.user.name });
});

module.exports = router;