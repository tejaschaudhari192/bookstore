import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const dbConfig: PoolConfig = {
    user: process.env.REMOTE_DB_USER,
    host: process.env.REMOTE_DB_HOST,
    port: 5432,
    database: process.env.REMOTE_DB_NAME,
    password: process.env.REMOTE_DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
}

export const connectionPool = new Pool(dbConfig);

export function connectToDB() {
    connectionPool.connect();
    connectionPool.on('connect', () => {
        console.log('Connected to the database');
    });
    connectionPool.on('error', () => {
        console.log('Connection error ! database');
    });
};