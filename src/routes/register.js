const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { pool } = require('../dbConfig');





app.get('/routes/register', (req, res) => {
  res.render('register');
});