import { Order, OrderStore } from '../../models/orders';
import { User, Users } from '../../models/users';

const ordersModel = new OrderStore();

let testUser: User;

beforeAll(async () => {
	//create a user for the orders
	const usersModel = new Users();
	testUser = await usersModel.create({
		username: 'testuser1',
		password: 'testpassword1',
		firstname: 'firstname1',
		lastname: 'lastname1',
	});
});
describe('Test the Orders Model', () => {
	it('tests the existance of index method', () => {
		expect(ordersModel.index).toBeDefined();
	});
	it('tests the existance of show method', () => {
		expect(ordersModel.show).toBeDefined();
	});

	it('tests the existance of create method', () => {
		expect(ordersModel.create).toBeDefined();
	});

	it('tests the existance of delete method', () => {
		expect(ordersModel.delete).toBeDefined();
	});

	it('tests the create method functionality', async () => {
		const createdOrder1 = await ordersModel.create({
			//@ts-ignore
			userId: testUser.id,
			status: 'active',
		});

		expect(createdOrder1.id).toBeTruthy();
		expect(createdOrder1).toEqual({
			id: createdOrder1.id,
			//@ts-ignore
			userId: testUser.id,
			status: 'active',
		});
		//delete created order
		//@ts-ignore
		await ordersModel.delete(createdOrder1.id);
	});

	it('tests the show method functionality', async () => {
		//@ts-ignore
		const createdOrder2 = await ordersModel.create({
			//@ts-ignore
			userId: testUser.id,
			status: 'active',
		});
		//@ts-ignore
		const result = await ordersModel.show(createdOrder2.id);

		expect(result).toEqual(createdOrder2);
		//@ts-ignore
		await ordersModel.delete(createdOrder2.id);
	});

	it('tests the index method functionality', async () => {
		const createdOrder = await ordersModel.create({
			userId: testUser.id || 1,
			status: 'active',
		});

		const orders = await ordersModel.index();

		expect(orders).toContain(createdOrder);

		await ordersModel.delete(createdOrder.id || 1);
	});

	it('tests the delete method functionality', async () => {
		const createdOrder = await ordersModel.create({
			//@ts-ignore
			userId: testUser.id,
			status: 'active',
		});
		//@ts-ignore
		await ordersModel.delete(createdOrder.id);
		const orders = await ordersModel.index();
		expect(orders).not.toContain(createdOrder);
	});
});
afterAll(async () => {
	//delete testuser
	const usersModel = new Users();
	//@ts-ignore
	await usersModel.delete(testUser.id);
});
