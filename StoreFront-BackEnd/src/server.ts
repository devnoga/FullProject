import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoute from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoute from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});

usersRoute(app);
productsRoutes(app);
ordersRoute(app);
dashboardRoutes(app);

const port = process.env.port || 3000;

app.listen(port, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
