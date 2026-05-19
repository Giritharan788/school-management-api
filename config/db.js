const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Add SSL for cloud DBs (Aiven, Render, TiDB, etc.) if needed. 
    // We can conditionally enable this based on the environment later.
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// Test connection silently, errors will show if any issue
pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database. Ensure database is running and credentials are correct. Error details:', err.message);
    });

module.exports = pool;
