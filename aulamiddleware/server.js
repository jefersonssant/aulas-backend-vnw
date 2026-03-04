const express = require("express")
const app = express()
const PORT = 3000;

//Middleware simple
// function meuLogger(req, res, next) {
//     console.log("Uma requisição foi feita!")
//     next(); // passar para a próxima etapa
// }

// app.use(meuLogger);

//Exemplo 2 - Verificar acesso
// function verificarAcesso(req, res, next) {
//     const autorizado = false;

//     if(!autorizado) {
//         return res.send("Acesso Negado!")
//     }

//     next()
// }

// app.get("/", (req, res) => {
//     res.send("Dia chuvoso!")
// })

// app.get("/area-restrita", verificarAcesso, (req, res) => {
//     res.send("Bem-vindo à área restrita!")
// })

app.get("/produto/:nome", (req, res) => {
    const nome = req.params.nome;

    res.send(`Produto selecionado: ${nome}`)
})

app.get("/usuario/:id", (req, res) => {
    const id = req.params.id;

    res.send(`Você pediu o usuário: ${id}`)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})