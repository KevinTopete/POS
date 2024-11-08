const client = require('../db/db'); // Aquí requieres tu conexión a la base de datos

// Función para obtener el usuario por nombre de usuario
const getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = $1'; // Busca el usuario por su nombre
    client.query(query, [username], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            // Si encontramos al usuario, devolvemos el primer resultado
            callback(null, res.rows[0]);
        }
    });
};

module.exports = {
    getUserByUsername,
};
