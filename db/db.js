const { Client } = require('pg'); // Importa el cliente de PostgreSQL

// Crea una instancia del cliente para conectar a PostgreSQL
const client = new Client({
    user: 'postgres', // El usuario de PostgreSQL (por defecto es 'postgres')
    host: 'localhost', // Para conexión local, usamos 'localhost'
    database: 'postgres', // Nombre de la base de datos
    password: 'Hipopo12', // La contraseña del usuario de PostgreSQL
    port: 5432, // El puerto por defecto de PostgreSQL
});

// Conecta al servidor de PostgreSQL
client.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error de conexión a PostgreSQL:', err));

module.exports = client;
