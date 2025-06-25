const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userService = require("./services/userService");

function initialize(passport) {
  // Configuração da estratégia JWT

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrai o token do cabeçalho Authorization
    secretOrKey: process.env.JWT_SECRET, // chave secreta para verificar o token
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await userService.findUserById(jwt_payload.id);
        if (!user)
          return done(null, false, { message: "Usuário não encontrado" });
        return done(null, user);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        return done(err, false);
      }
    })
  );
}

module.exports = initialize;
