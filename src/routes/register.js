const bcrypt = require("bcrypt");

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router(); // CERTO!


const userService = require("../services/userService");



router.get("/", async (req, res) => {
  res.status(200).json({
    message: "Registro realizado com sucesso!",
  });
});
router.post("/",  async (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ error_message: "Preencha todos os campos!" });
  }
  if (password.length < 6) {
    errors.push({ error_message: "Senha deve ter mais de 6 caracteres." });
  }
  if (password !== password2) {
    errors.push({ error_message: "As senhas devem ser iguais." });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const userExists = await userService.findUserByEmail(email);
    if (userExists)
      return res
        .status(409)
        .json({ errors: [{ error_message: "Email já registrado" }] });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({
      name,
      email,
      hashedPassword,
    });

    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success_message: "Usuário registrado com sucesso!",
      user: newUser,
      token,
    })
  } catch (err) {
    console.error("Erro ao verificar usuário:", err);
    return res
      .status(500)
      .json({ error_message: "Erro ao verificar usuário." });
  }

  
});
module.exports = router;
