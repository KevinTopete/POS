// test.js
const client = require('./db/db'); // Requiere la configuración de la conexión a PostgreSQL

// Realizar la primera consulta (fecha y hora actual)
client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al ejecutar la consulta:', err);
    } else {
        console.log('Resultado de la consulta de NOW:', res.rows); // Debería mostrar la fecha y hora actual de PostgreSQL
    }

    // Realizar la segunda consulta (usuarios)
    client.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.error('Error al ejecutar la consulta de usuarios:', err);
        } else {
            console.log('Resultado de la consulta de usuarios:', res.rows); // Debería mostrar los usuarios
        }

        // Cerrar la conexión después de todas las consultas
        client.end();
    });
});
