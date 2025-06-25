const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");

// Cria um novo usuário
async function createUser({ name, email, hashedPassword }) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );

  return result.rows[0] || null;
}

// Compara a senha fornecida com a senha criptografada
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Busca um usuário pelo email
async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

// Busca um usuário pelo ID
async function findUserById(id) {
  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
  createUser,
  comparePassword,
  findUserByEmail,
  findUserById,
};
