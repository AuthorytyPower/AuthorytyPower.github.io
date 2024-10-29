const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "tu_usuario",
    password: "tu_contraseña",
    database: "nombre_de_tu_base_de_datos"
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conectado a la base de datos MySQL");
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta de inicio de sesión
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error en el servidor" });
        } else if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});