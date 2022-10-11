import { Injectable } from '@angular/core';
import { ShoppingItem } from '../models/ShoppingItem';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	orderItems: ShoppingItem[] = [];
	constructor() {}

	getOrderTotal(): number {
		let total = 0;
		this.orderItems.forEach((item) => {
			total += item.product.price * item.quantity;
		});
		return total;
	}
}
