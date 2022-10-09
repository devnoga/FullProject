import { Product, ProductStore } from '../../models/products';

const productModel = new ProductStore();

describe('Test the Products Model', () => {
	it('tests the existance of index method', () => {
		expect(productModel.index).toBeDefined();
	});
	it('tests the existance of show method', () => {
		expect(productModel.show).toBeDefined();
	});

	it('tests the existance of create method', () => {
		expect(productModel.create).toBeDefined();
	});

	it('tests the existance of delete method', () => {
		expect(productModel.delete).toBeDefined();
	});

	it('tests the create method functionality', async () => {
		const createdProduct = await productModel.create({
			name: 'testProduct1',
			price: 30,
			category: 'Groecery',
			url: 'empty',
			description: 'testDesc',
		});

		const newId = createdProduct.id;

		expect(newId).toBeTruthy();

		expect(createdProduct).toEqual({
			id: newId,
			name: 'testProduct1',
			price: 30,
			category: 'Groecery',
			url: 'empty',
			description: 'testDesc',
		});

		//delete created product
		await productModel.delete(newId || 1);
	});

	it('tests the show method functionality', async () => {
		const createdProduct = await productModel.create({
			name: 'testProduct1',
			price: 30,
			category: 'Groecery',
			url: 'empty',
			description: 'testDesc',
		});

		const result = await productModel.show(createdProduct.id || 1);

		expect(result).toEqual(createdProduct);

		await productModel.delete(createdProduct.id || 1);
	});

	it('tests the index method functionality', async () => {
		const createdProduct = await productModel.create({
			name: 'testProduct1',
			price: 30,
			category: 'Groecery',
			url: 'empty',
			description: 'testDesc',
		});

		const products = await productModel.index();

		expect(products).toContain(createdProduct);

		await productModel.delete(createdProduct.id || 1);
	});

	it('tests the delete method functionality', async () => {
		const createdProduct = await productModel.create({
			name: 'testProduct1',
			price: 30,
			category: 'Groecery',
			url: 'empty',
			description: 'testDesc',
		});

		await productModel.delete(createdProduct.id || 1);
		const products = await productModel.index();
		expect(products).not.toContain(createdProduct);
	});
});
