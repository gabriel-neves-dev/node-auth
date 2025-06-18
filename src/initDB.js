
const { Client } = require('pg');

const dbName = process.env.DB_DATABASE || 'nodeauth';
const dbUser = process.env.DB_USER || 'nodeauth_user';
const dbPassword = process.env.DB_PASSWORD || 'nodeauth_pass';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

// Usuário superadmin para criar banco e usuário
const adminUser = process.env.PG_ADMIN_USER || 'postgres';
const adminPassword = process.env.PG_ADMIN_PASSWORD || 'postgres';

async function run() {
  // Conecta como superusuário
  const adminClient = new Client({
    user: adminUser,
    password: adminPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres',
  });
  await adminClient.connect();

  // Cria o banco de dados
  try {
    await adminClient.query(`CREATE DATABASE ${dbName} WITH ENCODING 'UTF8'`);
    console.log(`Banco de dados '${dbName}' criado.`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Banco de dados '${dbName}' já existe.`);
    } else {
      throw err;
    }
  }

  // Cria o usuário
  try {
    await adminClient.query(
      `DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${dbUser}') THEN
          CREATE ROLE ${dbUser} LOGIN PASSWORD '${dbPassword}';
        END IF;
      END
      $$;`
    );
    console.log(`Usuário '${dbUser}' criado/verificado.`);
  } catch (err) {
    throw err;
  }

  // Concede permissões ao usuário no banco
  try {
    await adminClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${dbUser};`);
    console.log(`Permissões concedidas ao usuário '${dbUser}' no banco '${dbName}'.`);
  } catch (err) {
    throw err;
  }

  await adminClient.end();

  // Conecta ao banco como admin para criar tabela e transferir propriedade
  const dbAdminClient = new Client({
    user: adminUser,
    password: adminPassword,
    host: dbHost,
    port: dbPort,
    database: dbName,
  });
  await dbAdminClient.connect();

  // Cria a tabela users, se não existir
  await dbAdminClient.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255)
    );
  `);
  console.log('Tabela users criada/verificada.');

  //  Transfere a propriedade da tabela para o usuário
  await dbAdminClient.query(`ALTER TABLE users OWNER TO ${dbUser};`);
  console.log(`Propriedade da tabela 'users' transferida para '${dbUser}'.`);

  await dbAdminClient.end();

  console.log('Banco de dados inicializado com sucesso!');
}

run().catch((err) => {
  console.error('Erro ao inicializar o banco:', err);
  process.exit(1);
});