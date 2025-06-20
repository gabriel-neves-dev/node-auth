const express = require('express');
const router = express.Router(); // CERTO!

router.get("/", (req, res) => {
  res.render("index");
});
module.exports = router;