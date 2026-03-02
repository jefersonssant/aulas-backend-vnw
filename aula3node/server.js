const express = require("express");
const app = express();
app.use(express.json())
const PORT = 3000;

let usuarios = [
    {id: 1, nome: "João", idade: 25},
    {id: 2, nome: "Vinicius", idade: 26}
]

app.get("/usuarios", (req, res) => {
    res.status(200).json(usuarios)
})

app.post("/usuarios", (req, res) => {
    const {nome, idade} = req.body
    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        idade
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}/usuarios`);
})