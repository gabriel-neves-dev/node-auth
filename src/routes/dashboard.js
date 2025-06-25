const express = require('express');
const router = express.Router();

const { checkAuthenticated } = require('../middlewares/authMiddlewares');


router.get("/", checkAuthenticated, (req, res) => {
  res.status(200).json({
    message: "Welcome to the Dashboard!" + " " + req.user.name,

  });

});

module.exports = router;