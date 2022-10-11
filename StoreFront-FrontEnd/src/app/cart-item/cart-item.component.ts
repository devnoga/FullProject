import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingItem } from '../models/ShoppingItem';

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
	@Input() cartItem: ShoppingItem = new ShoppingItem();
	@Output() changeQuantity: EventEmitter<any> = new EventEmitter();
	@Output() removeItem: EventEmitter<any> = new EventEmitter();

	constructor() {}
	ngOnInit(): void {}

	changeQuantityValue(): void {
		const cartItem = {
			product: this.cartItem.product,
			quantity: this.cartItem.quantity,
		};
		this.changeQuantity.emit(cartItem);
	}

	removeCartItem(cartItem: ShoppingItem): void {
		this.removeItem.emit(cartItem);
	}
}
