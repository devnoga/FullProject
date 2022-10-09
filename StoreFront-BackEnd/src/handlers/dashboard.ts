import { Application, Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashborad = new DashboardQueries();
const getPopularProduct = async (req: Request, res: Response) => {
	try {
		const result = await dashborad.showPopularProducts();

		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const getProductsByCategory = async (req: Request, res: Response) => {
	try {
		const result = await dashborad.showProductsByCategory(req.body.category);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const dashboardRoutes = (app: Application) => {
	app.get('/popular_product', getPopularProduct);
	app.get('/products_by_category', getProductsByCategory);
};

export default dashboardRoutes;
