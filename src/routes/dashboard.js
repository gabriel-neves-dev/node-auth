const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticaded } = require('../middlewares/authMiddlewares.js');


router.get("/", checkNotAuthenticaded, (req, res) => {
  res.render("dashboard", { user: req.user.name });
});

module.exports = router;