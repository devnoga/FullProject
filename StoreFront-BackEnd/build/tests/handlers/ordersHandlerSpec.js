"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../../models/users");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const usersModel = new users_1.Users();
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
        var decoded = jsonwebtoken_1.default.decode(userResponse.body, { complete: true });
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
