const express = require("express");
const pool = require("./config/db");
const validarUsuarios = require("./validacao/usuarios");
const validarPost = require("./validacao/post");


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Rede Social!</h1>");
});

app.get("/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query(`
            SELECT * FROM usuarios;
        `);
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar dados de usuários" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const resultado = await pool.query(`
            SELECT
                usuarios.id,
                usuarios.nome,
                post.titulo,
                post.conteudo,
                post.criado_em,
                post.id AS post_id
            FROM post
            JOIN usuarios
            ON post.usuario_id = usuarios.id
            ORDER BY post.criado_em DESC
        `);
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar postagens" });
  }
});

app.post("/usuarios", validarUsuarios, async (req, res) => {
  try {
    const {nome, email, senha} = req.body;
    const resultado = await pool.query(`
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [nome, email, senha]
  );
  res.status(201).json({
    mensagem: "Usuário criado com sucesso",
    usuario: resultado.rows[0]
  })
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao criar usuário"
    })
  }
})

app.post("/posts", validarPost, async (req, res) => {
  try {
    const { titulo, conteudo, usuario_id } = req.body;
    const resultado = await pool.query(
      `
      INSERT INTO post (titulo, conteudo, usuario_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [titulo, conteudo, usuario_id],
    );
    res.status(201).json({
      mensagem: "Post criado com sucesso",
      post: resultado.rows[0],
    });
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao criar postagem",
    });
  }
});

app.put("/posts/:id", validarPost, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    const resultado = await pool.query(
      `UPDATE post SET titulo=$1, conteudo=$2 WHERE id=$3 RETURNING *`,
      [titulo, conteudo, id],
    );
    res.status(200).json({
      mensagem: "Post atualizado com sucesso",
      post: resultado.rows[0],
    });
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao atualizar post",
    });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      `DELETE FROM post WHERE id=$1 RETURNING *`,
      [id],
    );

    res.json({
      mensagem: "Post deletado com sucesso",
      post: resultado.rows[0],
    });
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao deletar post",
    });
  }
});

module.exports = app;
