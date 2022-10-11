import { Injectable } from '@angular/core';
import { ShoppingItem } from '../models/ShoppingItem';
import { Product } from '../models/Product';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	cartItems: ShoppingItem[] = [];
	constructor() {}

	getCartTotal(): number {
		let total = 0;
		this.cartItems.forEach((item) => {
			total += item.product.price * item.quantity;
		});
		return parseFloat(total.toFixed(3));
	}

	getCartItems() {
		return this.cartItems;
	}
	updateCartItems(cartItem: ShoppingItem) {
		this.cartItems.forEach((item) => {
			if (item.product.id === cartItem.product.id)
				item.quantity = cartItem.quantity;
		});
		return this.cartItems;
	}
	removeCartItem(cartItem: ShoppingItem) {
		let index = this.cartItems.findIndex(
			(item) => cartItem.product.id === item.product.id
		);
		this.cartItems.splice(index, 1);
		return this.cartItems;
	}
	addToCart(product: Product, quantity: any) {
		//If the user adding a previuosly added product to the cart, just update the quantity of this product
		let quantityUpdate = false;
		this.cartItems.forEach((item) => {
			if (item.product.id === product.id) {
				let newQuantity = item.quantity + parseInt(quantity);
				quantityUpdate = true;
				if (newQuantity > 5) {
					alert(`Maximum quantity for the item is 5!`);
					return;
				} else {
					item.quantity = newQuantity;
					alert(`Update the Quantity to ${item.quantity}`);
					return;
				}
			}
		});
		if (quantityUpdate) return;

		// If not, add a new item to the cart
		const newCartItem: ShoppingItem = {
			product: product,
			quantity: parseInt(quantity),
		};
		this.cartItems.push(newCartItem);
		alert(`${product.name} has been added to your cart.`);
	}
	emptyCart() {
		this.cartItems = [];
		return this.cartItems;
	}
}
