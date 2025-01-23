import { Pool, PoolConfig } from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const dbConfig: PoolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    password: `${process.env.DB_PASSWORD}`,
}
// console.log(process.env.DB_PASSWORD);

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
