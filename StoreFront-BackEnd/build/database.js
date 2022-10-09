"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, DB_HOST, DB_PORT, ENV, } = process.env;
const dbConfig = {
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(DB_PORT || '5432'),
    host: DB_HOST,
    database: '',
};
if (ENV === 'dev')
    dbConfig.database = POSTGRES_DB || '';
else
    dbConfig.database = POSTGRES_DB_TEST || '';
console.log('DB Config:' + dbConfig.database, dbConfig.host, dbConfig.port);
const pool = new pg_1.Pool(dbConfig);
exports.default = pool;
