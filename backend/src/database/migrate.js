// Basic script to run the schema.sql against the database
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const runMigration = async () => {
    let connection;
    try {
        // Connect without database selected first to create it if needed
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 3306,
        });

        console.log('Connected to MySQL server...');

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database ${process.env.DB_NAME} created or already exists.`);

        await connection.changeUser({ database: process.env.DB_NAME });

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon to execute statements separately
        // Note: This is a simple migration script. For production, use a migration tool like knex or sequelize-cli.
        const statements = schemaSql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            try {
                await connection.query(statement);
            } catch (err) {
                // Ignore "Table already exists" (1050) and "Duplicate key name" (1061)
                if (err.errno === 1050 || err.errno === 1061) {
                    console.log(`Skipping duplicate/existing entity: ${err.sqlMessage}`);
                } else {
                    throw err;
                }
            }
        }

        console.log('Schema migration completed successfully.');

    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

if (require.main === module) {
    runMigration().catch(() => process.exit(1));
}

module.exports = runMigration;
