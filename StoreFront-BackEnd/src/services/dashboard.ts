import pool from '../database';
import { Product } from '../models/products';

export class DashboardQueries {
	async showPopularProducts(): Promise<Product[]> {
		try {
			const sql =
				'SELECT product_id, SUM(quantity) as s FROM order_products  GROUP BY product_id ORDER BY s DESC LIMIT 5';

			const conn = await pool.connect();
			const result = await conn.query(sql);

			return result.rows;
		} catch (error) {
			throw new Error(
				`Error: a database error happened while retrieving most popular 5 products: ${error}`
			);
		}
	}

	async showProductsByCategory(category: string): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM products WHERE category=($1)';

			const conn = await pool.connect();
			const result = await conn.query(sql, [category]);

			return result.rows;
		} catch (error) {
			throw new Error(
				`Error: Could not find products with category: ${category}: ${error}`
			);
		}
	}
}
