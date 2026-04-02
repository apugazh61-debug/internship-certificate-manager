const mysql = require('mysql2/promise');

async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'internship_db'}\`;`);
        console.log('Database created or already exists.');
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await connection.end();
    }
}

createDatabase();
