const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function migrate() {
    try {
        console.log('Reading init.sql...');
        const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
        
        // Split by semicolon to run queries one by one
        const queries = sql.split(';').filter(q => q.trim() !== '');
        
        for (let query of queries) {
            console.log(`Executing: ${query.substring(0, 50)}...`);
            await db.query(query);
        }
        
        console.log('Database initialized successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

migrate();
