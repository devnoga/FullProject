import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import app from '../../server';

const request = supertest(app);

describe('Test endpoint of Users ', () => {
	it('Endpoint test-1: retrieves all users endpoint', async () => {
		//1. Create a user
		const userResponse = await request
			.post('/users')
			.send({
				username: 'endpointtestuser2',
				password: 'testpassword2',
				firstname: 'firstname2',
				lastname: 'lastname2',
			})
			.set('Accept', 'application/json');

		//2. retrieve all users
		await request
			.get(`/users/`)
			.set('Authorization', `Bearer ${userResponse.body}`)
			.expect('Content-Type', /json/)
			.expect(200);
	});
	it('Endpoint test-2: retrieves a specific user by id', async () => {
		//1. Create a user
		const userResponse = await request
			.post('/users')
			.send({
				username: 'endpointtestuser2',
				password: 'testpassword2',
				firstname: 'firstname2',
				lastname: 'lastname2',
			})
			.set('Accept', 'application/json');

		//2. decode th token to get user id to be used in the test
		var decoded = jwt.decode(userResponse.body, { complete: true });

		await request
			//@ts-ignore
			.get(`/users/${decoded.payload.id}`)
			.set('Authorization', `Bearer ${userResponse.body}`)
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('Endpoint test-3: create a new user', async () => {
		const userResponse = await request
			.post('/users')
			.send({
				username: 'testuser2',
				password: 'testpassword2',
				firstname: 'firstname2',
				lastname: 'lastname2',
			})
			.set('Accept', 'application/json')
			.expect(200);
	});
});
