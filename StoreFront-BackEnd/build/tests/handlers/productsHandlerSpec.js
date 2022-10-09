"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../models/users");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const usersModel = new users_1.Users();
describe('Test endpoints of Products ', () => {
    it('Endpoint test-1: retrieve all products endpoint', async () => {
        await request.get('/products').expect('Content-Type', /json/).expect(200);
    });
    it('Endpoint test-2:retrieve a specific product by id', async () => {
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
        //2. Create a product
        const prodcutRes = await request
            .post('/products')
            .send({
            name: 'Product_2',
            price: 50,
            category: 'Home Decore',
        })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userResponse.body}`)
            .expect(200);
        //3. retrieve created product
        await request
            .get(`/products/${prodcutRes.body.id}`)
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it('Endpoint test-3:retrieve a specific product by id with invalid id', async () => {
        await request
            .get('/products/ss')
            .expect('Content-Type', /json/)
            .expect(400);
    });
    it('Endpoint test-4: add a new product', async () => {
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
        //2. Add a new product
        const response = await request
            .post('/products')
            .send({
            name: 'Product_1',
            price: 40,
            category: 'Home Decore',
        })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userResponse.body}`)
            .expect(200);
        //Delete created product
        await request.delete(`/products/${response.body.id}`).send();
    });
});
