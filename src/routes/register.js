const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
const express = require("express");
const router = express.Router(); // CERTO!
const {
  checkAuthenticated,
  checkNotAuthenticaded,
} = require("../middlewares/authMiddlewares.js");

router.get("/", checkAuthenticated, (req, res) => {
  res.status(200).json({
    message: "Registro realizado com sucesso!",
  });

});
router.post("/", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  console.log({
    name,
    email,
    password,
    password2,
  });

  let errors = [];

  if (!name || !password || !password2) {
    errors.push({ message: "Preencha todos os campos!" });
  }

  if (password.length < 6) {
    errors.push({ message: "Senha deve ter mais de 6 caracteres." });
  }

  if (password != password2) {
    errors.push({ message: "As senhas devem ser iguais." });
  }

  if (errors.length > 0) {
    return res.statusCode(400).json({
      message: "Preencha todos os campos!",
    });
  } else {
    // form vlaidation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.status(400).json({
            message: "Email já registrado",
          });

        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }

              console.log(results.rows);
              req.flash(
                "sucess_msg",
                "Registro completo com sucesso! Por favor faça o login"
              );
              res.status(200).json({
                message: "Registro completo com sucesso! Por favor faça o login",
              });

            }
          );
        }
      }
    );
  }
});
module.exports = router;
