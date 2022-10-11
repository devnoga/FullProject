import { Product } from './Product';

export class ShoppingItem {
	product: Product;
	quantity: number = 1;
	constructor() {
		this.product = new Product();
	}
}
