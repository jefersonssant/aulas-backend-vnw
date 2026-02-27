require('dotenv').config();
const express = require('express');
const app = express();
//const PORT = 3000
const PORT = process.env.PORT


app.get('/', (req, res) => {
    res.send('Bem vindos a segunda aula de node e express e .env!')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})