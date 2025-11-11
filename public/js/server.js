const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const conexion = require("../../db/conexion");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // sirve archivos estáticos (HTML, JS, etc.)

// ====== RUTAS CRUD ======

// Crear usuario
app.post("/usuarios", (req, res) => {
  const { nombre, correo } = req.body;
  const sql = "INSERT INTO usuarios (nombre, correo) VALUES (?, ?)";
  conexion.query(sql, [nombre, correo], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Usuario creado", id: result.insertId });
  });
});

// Leer usuarios
app.get("/usuarios", (req, res) => {
  conexion.query("SELECT * FROM usuarios", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Actualizar usuario
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const sql = "UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?";
  conexion.query(sql, [nombre, correo, id], err => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Usuario actualizado" });
  });
});

//  Eliminar usuario
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ?";
  conexion.query(sql, [id], err => {
    if (err) res.status(500).send(err);
    else res.send({ message: "Usuario eliminado" });
  });
});

// ====== SERVIDOR ======
app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
