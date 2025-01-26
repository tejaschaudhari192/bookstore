import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const dbConfig: PoolConfig = {
    user: process.env.LOCAL_DB_USER,
    host: process.env.LOCAL_DB_HOST,
    port: 5432,
    database: process.env.LOCAL_DB_NAME,
    password: process.env.LOCAL_DB_PASSWORD,
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
    // ssl: {
    //     rejectUnauthorized: false,
    // }
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