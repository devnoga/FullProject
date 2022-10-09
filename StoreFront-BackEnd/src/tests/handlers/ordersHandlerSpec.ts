import supertest from 'supertest';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Users } from '../../models/users';
import app from '../../server';

const request = supertest(app);
const usersModel = new Users();

describe('Test endpoints of Orders ', () => {
	it('Endpoint test-1: retrieve current order', async () => {
		//1. Create a user to use token auth.
		const userResponse = await request
			.post('/users')
			.send({
				username: 'testuser2',
				password: 'testpassword2',
				firstname: 'firstname2',
				lastname: 'lastname2',
			})
			.set('Accept', 'application/json');

		//2. Create an order with active status
		var decoded = jwt.decode(userResponse.body, { complete: true });
		//@ts-ignore
		const userId = decoded.payload.id;

		const createdOrderRes = await request
			.post('/orders')
			.send({ userId: userId, status: 'active' })
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${userResponse.body}`);

		console.log('CREATED ORDER RESPONSE BODY:', createdOrderRes.body);

		//3. Retieve the active(current) order
		const activeOrderRes = await request
			.get(`/orders/${userId}`)
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${userResponse.body}`)
			.expect(200);
	});
});
