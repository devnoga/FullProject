import { Order, OrderStore } from '../models/orders';
import { Application, Request, Response } from 'express';
import { verifyAuthToken } from './users';

const orderStore = new OrderStore();

const create = async (req: Request, res: Response) => {
	try {
		const newOrder: Order = {
			userId: parseInt(req.body.userId),
			status: req.body.status,
		};
		const createdOrder = await orderStore.create(newOrder);
		res.status(200).json(createdOrder);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const currentOrder = async (req: Request, res: Response) => {
	try {
		const currentOrder = await orderStore.currentOrder(
			parseInt(req.params.userId)
		);
		if (currentOrder) res.status(200).json(currentOrder);
		else
			throw new Error(`Error: No current order for user ${req.params.userId}`);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};
const addProduct = async (req: Request, res: Response) => {
	try {
		const addedProduct = await orderStore.addProduct(
			parseInt(req.body.quantity),
			parseInt(req.params.orderId),
			parseInt(req.body.productId)
		);
		res.status(200).json(addedProduct);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const ordersRoute = (app: Application) => {
	app.get('/orders/:userId', verifyAuthToken, currentOrder);
	app.post('/orders', verifyAuthToken, create);
	app.post('/orders/:orderId/prodcuts', verifyAuthToken, addProduct);
};

export default ordersRoute;
