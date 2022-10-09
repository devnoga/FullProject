"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
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
        var decoded = jsonwebtoken_1.default.decode(userResponse.body, { complete: true });
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
