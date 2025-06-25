const express = require('express');
const router = express.Router(); // CERTO!

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!"); // Send a simple response

});
module.exports = router;