import pool from '../database';

export type Product = {
	id?: number;
	name: string;
	price: number;
	category: string;
	url: string;
	description: string;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			// @ts-ignore
			const sql = 'SELECT * FROM products';

			const conn = await pool.connect();
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(
				`Error: A batabase error happened while retrieving all products: ${error}`
			);
		}
	}

	async show(id: number): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';

			const conn = await pool.connect();
			const result = await conn.query(sql, [id]);

			if (!result.rowCount) throw new Error(`Error:No product with id: ${id}:`);
			conn.release();

			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: A batabase error happened while retrieving details for product with id ${id} :  ${error}`
			);
		}
	}

	async create(product: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO products (name, price, category, url, description) VALUES ($1,$2,$3,$4,$5) RETURNING *';

			const conn = await pool.connect();
			const result = await conn.query(sql, [
				product.name,
				product.price,
				product.category,
				product.url,
				product.description,
			]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: Could not add a new product with name: ${product.name}: ${error}`
			);
		}
	}
	async delete(id: number): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id= ($1)RETURNING *';

			const conn = await pool.connect();
			const result = await conn.query(sql, [id]);
			conn.release();

			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: Could not delete product with id: ${id}: ${error}`
			);
		}
	}
}
