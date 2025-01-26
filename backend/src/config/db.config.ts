import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const localDbConfig: PoolConfig = {
    user: process.env.LOCAL_DB_USER,
    host: process.env.LOCAL_DB_HOST,
    port: 5432,
    database: process.env.LOCAL_DB_NAME,
    password: process.env.LOCAL_DB_PASSWORD
}

const remoteDbConfig: PoolConfig = {
    user: process.env.REMOTE_DB_USER,
    host: process.env.REMOTE_DB_HOST,
    port: 5432,
    database: process.env.REMOTE_DB_NAME,
    password: process.env.REMOTE_DB_PASSWORD,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false,
    }
}

export const connectionPool = new Pool(remoteDbConfig);

export function connectToDB() {
    connectionPool.connect();
    connectionPool.on('connect', () => {
        console.log('Connected to the database');
    });
    connectionPool.on('error', () => {
        console.log('Connection error ! database');
    });
};