export class Product {
	id: number;
	name: string;
	price: number;
	url: string;
	description: string;

	constructor() {
		this.id = 1;
		this.name = '';
		this.description = '';
		this.price = 0.0;
		this.url = '';
	}
}
