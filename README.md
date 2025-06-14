# Node Auth

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?logo=passport&logoColor=white)

## ✨ Sobre o Projeto

Este é um sistema simples de autenticação de usuários utilizando **Node.js**, **Express**, **Passport.js** e **PostgreSQL**. Ele permite que usuários se registrem, façam login, acessem um dashboard protegido e façam logout.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- EJS (Engine de templates)
- Passport.js (Autenticação)
- PostgreSQL (Banco de dados)
- Bcrypt (Hash de senhas)
- Express-session & express-flash

## 📦 Instalação e Uso

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/node-auth.git
cd node-auth
```

### 2. Instale as dependências

```sh
npm install
```

### 3. Configure o banco de dados

- Crie um banco PostgreSQL chamado `nodeauth` (ou altere o nome no arquivo `.env`).
- Crie a tabela `users`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

### 4. Configure as variáveis de ambiente

- Renomeie o arquivo `.env.example` para `.env` (ou crie um novo `.env`) e preencha com suas credenciais do banco:

```
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=nodeauth
```

### 5. Inicie o servidor

```sh
npm run dev
```

Acesse em [http://localhost:4000](http://localhost:4000)

---

## 📝 Funcionalidades

- Registro de usuário
- Login com autenticação
- Dashboard protegido (apenas usuários autenticados)
- Logout
- Mensagens de erro e sucesso

---

## 📁 Estrutura de Pastas

```
.
├── dbConfig.js
├── passportConfig.js
├── server.js
├── views/
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── register.ejs
├── .env
├── package.json
└── ...
```

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests!

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

Feito com 💚 por [Seu Nome]