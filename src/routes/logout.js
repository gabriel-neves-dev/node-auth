const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Erro ao fazer logout", err);
      return res.status(500).send("Erro durante logout");
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao destruir sessão:", err);
        return res.status(500).send("Erro ao destruir sessão");
      }
      res.redirect("/");
    });
  });
});

module.exports = router;
