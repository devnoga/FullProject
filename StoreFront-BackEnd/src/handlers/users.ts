import { User, Users } from '../models/users';
import { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userModle: Users = new Users();

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		validateUserData(req);

		const user: User = getUserData(req);

		const createdUser = await userModle.create(user);

		//Create token
		//@ts-ignore
		const token = jwt.sign(createdUser, process.env.TOKEN_SECRET);

		res.status(200).json(token);

	} catch (error) {
		console.error(error);
		res
			.status(400)
			.send(`Error: An error happened while Creating a new user. ${error}`);
	}
};

const index = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await userModle.index();
		console.log(`users: ${users}`);
		res.json(users);
	} catch (error) {
		console.error(error);
		res
			.status(400)
			.send(`Error: An error happened while retriving users data. ${error}`);
	}
};

const show = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = parseInt(req.params.id);
		if (!id) throw new Error('Error: User id is not a valid id');

		const user: User = await userModle.show(id);
		res.json(user);
	} catch (error) {
		console.error(error);
		res
			.status(400)
			.send(
				`Error: An error happened while retrieving user: ${req.params.id} data. ${error}`
			);
	}
};
const authonticate = async (req: Request, res: Response) => {
	try {
		const user: User | null = await userModle.authenticate(
			req.body.username,
			req.body.password
		);
		if (user) {
			//Create token
			//@ts-ignore
			const token = jwt.sign(user, process.env.TOKEN_SECRET);
			res.status(200).json(token);
		} else throw new Error('Error: username is not correct!');
	} catch (error) {
		console.error(error);
		res
			.status(400)
			.send(
				`Error: An error happened while retrieving user: ${req.params.username} data. ${error}`
			);
	}
};
//@ts-ignore
export const verifyAuthToken = (req: Request, res: Response, next): void => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1];
		//@ts-ignore
		jwt.verify(token, process.env.TOKEN_SECRET);
		console.log('verification Done:');
		next();
	} catch (error) {
		console.error(error);
		res.status(401);
		res.json(`Access denied, Invalid token`);
		return;
	}
};
//A helper function to validate the provided user data from the request.
const validateUserData = (req: Request): void => {
	if (!req.body.firstname) throw new Error(`Error: Invalid firstname`);
	if (!req.body.lastname) throw new Error(`Error: Invalid lastname`);
	if (!req.body.username) throw new Error(`Error: Invalid username`);
	if (!req.body.password) throw new Error(`Error: Invalid password`);
};
//A helper function to construct user object from the request data.
const getUserData = (req: Request): User => {
	const user: User = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
	};
	return user;
};
const usersRoute = (app: Application) => {
	app.post('/users', createUser);
	app.post('/users/authonticate', authonticate);
	app.get('/users', verifyAuthToken, index);
	app.get('/users/:id', verifyAuthToken, show);
};

export default usersRoute;
