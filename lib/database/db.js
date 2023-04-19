import pkg from "pg";
const { Pool } = pkg;
let pool;

if (!pool) {
    pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: 'postgres',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
}

export default pool;