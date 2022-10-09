import pool from '../database';

export type Order = {
	id?: number;
	userId: number;
	status: string;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders';
			const conn = await pool.connect();
			const result = await conn.query(sql);
			conn.release();

			let orders: Order[] = [];

			result.rows.forEach((order) => {
				orders.push({
					id: order.id,
					userId: parseInt(order.user_id),
					status: order.order_status,
				});
			});
			// return result.rows;
			return orders;
		} catch (error) {
			throw new Error(
				`Error: A batabase error happened while retrieving all orders: ${error}`
			);
		}
	}

	async show(id: number): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const conn = await pool.connect();
			const result = await conn.query(sql, [id]);

			if (!result.rowCount) throw new Error(`Error:No Order with id: ${id}:`);
			conn.release();

			const order: Order = {
				id: result.rows[0].id,
				userId: parseInt(result.rows[0].user_id),
				status: result.rows[0].order_status,
			};

			// return result.rows[0];
			return order;
		} catch (error) {
			throw new Error(
				`Error: A batabase error happened while retrieving details for order with id ${id} :  ${error}`
			);
		}
	}
	async create(order: Order): Promise<Order> {
		try {
			const conn = await pool.connect();
			const sql =
				'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
			const result = await conn.query(sql, [order.userId, order.status]);
			conn.release();

			const createdOrder: Order = {
				id: result.rows[0].id,
				userId: parseInt(result.rows[0].user_id),
				status: result.rows[0].order_status,
			};

			// return result.rows[0];
			return createdOrder;
		} catch (error) {
			throw new Error(
				`Error: a database error happened while creating a new order for user ${order.userId}: ${error}`
			);
		}
	}

	async delete(id: number): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

			const conn = await pool.connect();
			const result = await conn.query(sql, [id]);
			conn.release();

			const order: Order = {
				id: result.rows[0].id,
				userId: parseInt(result.rows[0].user_id),
				status: result.rows[0].order_status,
			};

			// return result.rows[0];
			return order;
		} catch (error) {
			throw new Error(`Error: Could not delete order with id: ${id}: ${error}`);
		}
	}

	async currentOrder(userId: number): Promise<Order> {
		try {
			const conn = await pool.connect();
			const sql =
				'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
			const result = await conn.query(sql, [userId, 'active']);
			conn.release();

			const order: Order = {
				id: result.rows[0].id,
				userId: parseInt(result.rows[0].user_id),
				status: result.rows[0].order_status,
			};

			// return result.rows[0];
			return order;
		} catch (error) {
			throw new Error(
				`Error: a database error happened while retrieving orders data for user ${userId}: ${error}`
			);
		}
	}

	async addProduct(
		quantity: number,
		orderId: number,
		productId: number
	): Promise<Order> {
		//Make sure the order is still active order

		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const conn = await pool.connect();

			const result = await conn.query(sql, [orderId]);

			const order = result.rows[0];

			if (order.order_status !== 'active') {
				throw new Error(
					`Error: Could not add more products to order ${orderId}, Order status is ${order.order_status}`
				);
			}
			conn.release();
		} catch (error) {
			throw new Error(
				`Error: a database error happened while adding a new product:${productId} to order ${orderId}: ${error}`
			);
		}

		try {
			const conn = await pool.connect();
			const sql =
				'INSERT INTO order_products(order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *';
			const result = await conn.query(sql, [orderId, productId, quantity]);
			conn.release();

			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Error: a database error happened while adding a new product:${productId} to order ${orderId}: ${error}`
			);
		}
	}
}
