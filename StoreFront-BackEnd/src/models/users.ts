import pool from '../database';
import bcrypt from 'bcryptjs';

export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	username: string;
	password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUND } = process.env;

export class Users {
	async index(): Promise<User[]> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM users';
			const result = await conn.query(sql);
			conn.release();

			return result.rows;
		} catch (error) {
			throw new Error(
				`Error: a database error happened while retrieving users data. ${error}`
			);
		}
	}
	async show(id: number): Promise<User> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();

			if (result.rowCount) return result.rows[0];
			else throw new Error('No user found with the specified id');
		} catch (error) {
			throw new Error(
				`Error: a database error happened while retrieving user data with id ${id}. ${error}`
			);
		}
	}

	async create(user: User): Promise<User> {
		// @ts-ignore
		try {
			const conn = await pool.connect();
			console.log('Connection is on');
			const hash: string = bcrypt.hashSync(
				user.password + BCRYPT_PASSWORD,
				parseInt(SALT_ROUND || '10')
			);

			const sql =
				'INSERT INTO users (firstname, lastname, username, password) VALUES ($1,$2,$3,$4) RETURNING *';

			const result = await conn.query(sql, [
				user.firstname,
				user.lastname,
				user.username,
				hash,
			]);
			conn.release();

			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: a database error happened while creating user ${user.firstname} ${user.lastname}: ${error}`
			);
		}
	}
	async authenticate(username: string, password: string): Promise<User | null> {
		try {
			const conn = await pool.connect();
			const sql = 'SELECT * FROM users WHERE username = ($1)';
			const result = await conn.query(sql, [username]);
			conn.release();

			if (result.rows.length) {
				if (
					bcrypt.compareSync(
						password + BCRYPT_PASSWORD,
						result.rows[0].password
					)
				)
					return result.rows[0];
			}
			return null;
		} catch (error) {
			throw new Error(`Error: An error happened  ${error}`);
		}
	}

	async delete(id: number): Promise<User> {
		try {
			const conn = await pool.connect();
			const sql = 'DELETE FROM users WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();

			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: a database error happened while deleting users data with user id ${id}. ${error}`
			);
		}
	}
}
