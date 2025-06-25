const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticaded,
} = require("../middlewares/authMiddlewares.js");

const { pool } = require("../dbConfig");

// router.get("/", checkAuthenticated, (req, res) => {
//   res.status(200).json({
//     message: "Login successful",
//   });
// });

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Campos vazios");
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      // Email não encontrado
      return res.status(401).json({ error: "Email não registrado." });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Senha incorreta
      return res.status(401).json({ error: "Email e/ou senha incorretos." });
    }

    // Login bem-sucedido
    console.log("Login realizado com sucesso!");
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
});

module.exports = router;
