import Config, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	DB_HOST,
	DB_PORT,

	ENV,
} = process.env;

const dbConfig = {
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	port: parseInt(DB_PORT || '5432'),
	host: DB_HOST,
	database: '',
};

if (ENV === 'dev') dbConfig.database = POSTGRES_DB || '';
else dbConfig.database = POSTGRES_DB_TEST || '';

console.log('DB Config:' + dbConfig.database);

const pool = new Pool(dbConfig);

export default pool;
