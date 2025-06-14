const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs"); //middleware

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "Gabriel" });
});

app.post("/users/register", async (req, res) => {
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
    res.render("register", { errors });
  } else {
    // form vlaidation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
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
          res.render("register", { errors });
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
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
