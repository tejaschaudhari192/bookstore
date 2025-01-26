"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
exports.connectToDB = connectToDB;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
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
};
exports.connectionPool = new pg_1.Pool(dbConfig);
function connectToDB() {
    exports.connectionPool.connect();
    exports.connectionPool.on('connect', () => {
        console.log('Connected to the database');
    });
    exports.connectionPool.on('error', () => {
        console.log('Connection error ! database');
    });
}
;
