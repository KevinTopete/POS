// authController.js
const bcrypt = require('bcrypt');
const { Client } = require('pg');  // Cliente de PostgreSQL
const path = require('path');  // Para usar rutas de archivo
const express = require('express');
const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;  // Obtenemos el usuario y la contraseña del formulario

    try {
        // Conectamos a la base de datos
        const client = new Client();
        await client.connect();

        // Buscamos al usuario en la base de datos
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];  // Usuario encontrado

            // Comparamos la contraseña ingresada con el hash almacenado
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Si las contraseñas coinciden, redirigimos al usuario a 'index.html'
                res.sendFile(path.join(__dirname, '../index.html'));  // Redirige al archivo 'index.html'
            } else {
                // Si las contraseñas no coinciden
                res.status(400).send('Contraseña incorrecta');
            }
        } else {
            // Si el usuario no existe
            res.status(400).send('Usuario no encontrado');
        }

        // Cerramos la conexión a la base de datos
        await client.end();
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
