require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000


let cadastros = [];
let proximoId = 1;

//Validações
function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

function telefoneValido(telefone) {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(telefone);
}
//Middleware para validações
function validarCadastro(req, res, next) {
    const {nome, email, telefone, mensagem} = req.body;

    if (!nome || nome.length < 3) {
        return res.status(400).json({
            erro: "Nome é obrigatório e deve conter pelo menos 3 caracteres"
        })
    }

    if (!email || !emailValido(email)) {
        return res.status(400).json({
            erro: "Email inválido"
        })
    }

    if (!telefone || !telefoneValido(telefone)) {
        return res.status(400).json({
            erro: "Telefone deve conter 10 a 11 números",
        })
    }

    if (mensagem && mensagem.length > 500) {
        return res.status(400).json({
            erro: "Mensagem pode ter no máximo 500 caracteres"
        })
    }

    next();
}

//Rotas
app.get("/cadastros", (req, res) => {
    res.status(200).json(cadastros)
})

app.post("/cadastros", validarCadastro, (req, res) => {
    const {nome, email, telefone, mensagem} = req.body;

    const novoCadastro = {
        id: proximoId++,
        nome,
        email,
        telefone,
        mensagem: mensagem || null
    };

    cadastros.push(novoCadastro);

    res.status(201).json({
        mensagem: "Cadastro enviado com sucesso",
        cadastro: novoCadastro
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})