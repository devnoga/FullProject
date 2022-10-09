import { Product, ProductStore } from '../models/products';
import { Application, Request, Response } from 'express';
import { verifyAuthToken } from './users';

// import jwt from 'jsonwebtoken';

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
	try {
		const products = await productStore.index();

		res.status(200).json(products);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		if (!id) throw new Error('Error: product id is not a valid id');
		const product = await productStore.show(id);
		res.status(200).json(product);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		validateProductData(req);
		const product = getProductData(req);
		const products = await productStore.create(product);
		res.status(200).json(products);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const remove = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		if (!id) throw new Error('Error: product id is not a valid id');
		const product = await productStore.delete(id);
		res.status(200).json(product);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

//A helper function to validate the provided product data from the request.
const validateProductData = (req: Request): void => {
	if (!req.body.name) throw new Error(`Error: Invalid product name`);
	if (!req.body.price) throw new Error(`Error: Invalid product price`);
	if (!req.body.category) throw new Error(`Error: Invalid product category`);
};
//A helper function to construct user object from the request data.
const getProductData = (req: Request): Product => {
	const product: Product = {
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		url: req.body.url,
		description: req.body.description,
	};
	return product;
};

const productsRoutes = (app: Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', verifyAuthToken, create);
	app.delete('/products/:id', verifyAuthToken, remove);
};

export default productsRoutes;
