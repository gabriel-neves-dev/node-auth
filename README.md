# Node Auth

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?logo=passport&logoColor=white)

## ✨ Sobre o Projeto

Este é um sistema simples de autenticação de usuários utilizando **Node.js**, **Express**, **Passport.js** e **PostgreSQL**. Ele permite que usuários se registrem, façam login, acessem um dashboard protegido e façam logout.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- EJS (Engine de templates)
- Passport.js (Autenticação)
- PostgreSQL (Banco de dados)
- Bcrypt (Hash de senhas)
- Express-session & express-flash

---

## ⚡ Como rodar o projeto

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/node-auth.git
cd node-auth
```

### 2. Instale as dependências

```sh
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme necessário):

```
DB_USER=nodeauth_user
DB_PASSWORD=nodeauth_pass
DB_DATABASE=nodeauth
DB_HOST=localhost
DB_PORT=5432

PG_ADMIN_USER=postgres
PG_ADMIN_PASSWORD=sua_senha_do_postgres
```

> **Atenção:** O usuário `PG_ADMIN_USER` precisa ter permissão para criar bancos e usuários no PostgreSQL (normalmente o usuário `postgres`). 
> **O script initDB.js já conta com instruções para que as devidas permissões sejam concedidas ao usuário.**

### 4. Inicialize o banco de dados automaticamente

Execute o comando abaixo para criar o banco, o usuário, conceder permissões e criar a tabela `users`:

```sh
npm run initdb
```

Pronto! O banco estará configurado para uso.

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
├── scripts/
│   └── initDb.js
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
Desenvolvido por Gabriel 💙

---

Este projeto faz parte do meu retorno ao universo da programação após um período afastado. Estou revisitando conceitos do básico ao avançado, então é possível que o código contenha alguns erros ou práticas que podem ser aprimoradas. Fique à vontade para sugerir melhorias ou apontar ajustes!