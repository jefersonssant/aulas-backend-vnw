// Importamos express
const express = require('express');

// criando uma aplicação express, aqui estamos inicializando o nosso servidor
const app = express()
const PORT = 3000

//"/" significa rota principal (http://localhost:3000/)
app.get("/", (req, res) => {
    // req = request (dados enviados pelo cliente)
    // res = response (resposta que vamos enviar)
    
    res.send('Olá, mundo! Bem vindo a aula de backend!')
})



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`)
})
