"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const usersModel = new users_1.Users();
describe('Test the Users Model', () => {
    it('tests the existance of index method', () => {
        expect(usersModel.index).toBeDefined();
    });
    it('tests the existance of show method', () => {
        expect(usersModel.show).toBeDefined();
    });
    it('tests the existance of create method', () => {
        expect(usersModel.create).toBeDefined();
    });
    it('tests the create method functionality', async () => {
        const createdUser = await usersModel.create({
            username: 'testuser1',
            password: 'testpassword1',
            firstname: 'firstname1',
            lastname: 'lastname1',
        });
        expect(createdUser.id).toBeTruthy();
        expect(createdUser.username).toEqual('testuser1');
        expect(createdUser.firstname).toEqual('firstname1');
        expect(createdUser.lastname).toEqual('lastname1');
        //delete the created user
        await usersModel.delete(createdUser.id || 1);
    });
    it('tests the index method functionality', async () => {
        const createdUser = await usersModel.create({
            username: 'testuser1',
            password: 'testpassword1',
            firstname: 'firstname1',
            lastname: 'lastname1',
        });
        const users = await usersModel.index();
        expect(users.length).toBeGreaterThanOrEqual(1);
        //delete the created user
        await usersModel.delete(createdUser.id || 1);
    });
    it('tests the show method functionality', async () => {
        const createdUser = await usersModel.create({
            username: 'testuser1',
            password: 'testpassword1',
            firstname: 'firstname1',
            lastname: 'lastname1',
        });
        const user = await usersModel.show(createdUser.id || 1);
        expect(user.username).toEqual('testuser1');
        expect(user.firstname).toEqual('firstname1');
        expect(user.lastname).toEqual('lastname1');
        //delete the created user
        await usersModel.delete(createdUser.id || 1);
    });
});
