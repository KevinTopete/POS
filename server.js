const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs'); // Para comparar las contraseñas hasheadas
const userModel = require('./models/userModel'); // Modelo de usuarios
const app = express();

// Servir archivos estáticos (CSS, JS, imágenes) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear los cuerpos de las solicitudes como JSON o urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta principal (raíz), redirige a /login automáticamente al iniciar
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a la página de login cuando se accede a la raíz
});

// Ruta para servir el formulario de login (GET)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Servir la página de login
});

// Ruta POST para manejar la autenticación, que solo se llama cuando el usuario hace clic en "Entrar"
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body; // Obtener los datos del formulario

    // Buscar el usuario en la base de datos
    userModel.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        if (!user) {
            return res.redirect('/login'); // Redirigir al login si el usuario no existe
            
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error al verificar la contraseña');
            }
            if (!isMatch) {
                return res.redirect('/login'); // Redirigir al login si la contraseña es incorrecta

            }

            // Si la autenticación es exitosa, redirigir al usuario al home
            res.redirect('/index.html'); // Redirige al home o página principal
        });
    });
});

// Ruta principal (home), después de login exitoso
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Página de inicio
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
