const { Client } = require('pg');

const dbName = 'nodeauth';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

async function createDatabase() {
  // Conecta ao banco padrão para criar o novo banco
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres', // banco padrão
  });

  await client.connect();

  // Cria o banco se não existir
  await client.query(`CREATE DATABASE ${dbName} WITH ENCODING 'UTF8'`);
  await client.end();
}

async function createUsersTable() {
  // Conecta ao banco recém-criado
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: dbName,
  });

  await client.connect();

  // Cria a tabela users se não existir
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255)
    );
  `);

  await client.end();
}

(async () => {
  try {
    await createDatabase();
    console.log(`Banco de dados '${dbName}' criado!`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Banco de dados '${dbName}' já existe.`);
    } else {
      console.error('Erro ao criar banco:', err);
      process.exit(1);
    }
  }

  try {
    await createUsersTable();
    console.log('Tabela users criada/verificada!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
    process.exit(1);
  }
})();