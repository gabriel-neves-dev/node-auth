// importa modulos necessários

const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const { checkAuthenticated, checkNotAuthenticaded } = require("./middlewares/authMiddlewares.js");



const PORT = process.env.PORT || 4000;

const path = require("path");

app.set("views", path.join(__dirname, "views")); // ou ajuste para o caminho correto
app.set("view engine", "ejs"); //middleware

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

const initializePassport = require("./passportConfig");

initializePassport(passport);
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

app.use(flash());

const registerRouter = require("./routes/register.js");
app.use("/users/register", registerRouter);
const loginRouter = require("./routes/login.js");
app.use("/users/login", loginRouter);
const logoutRouter = require("./routes/logout.js");
app.use("/users/logout", logoutRouter);
const dashboardRouter = require("./routes/dashboard.js");
app.use("/users/dashboard", dashboardRouter);
const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
