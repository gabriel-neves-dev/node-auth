const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users/register', (req, res) => {
    req.render('register')
});

app.get('/users/login', (req, res) => {
    req.render('login')
});

app.get('/users/dashboard', (req, res) => {
    req.render('dashboard')
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})