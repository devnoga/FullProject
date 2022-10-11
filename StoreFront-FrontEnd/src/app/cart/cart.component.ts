import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../models/ShoppingItem';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	cartItems: ShoppingItem[] = [];
	cartTotal: number = 0.0;
	constructor(
		private cartService: CartService,
		private orderService: OrdersService
	) {}

	ngOnInit(): void {
		this.cartItems = this.cartService.getCartItems();
		this.cartTotal = this.cartService.getCartTotal();
	}
	changeQuantityInParent(cartItem: ShoppingItem) {
		this.cartItems = this.cartService.updateCartItems(cartItem);
		this.cartTotal = this.cartService.getCartTotal();

		alert(`New Cart Total: ${this.cartTotal}`);
	}
	removeCartItem(cartItem: ShoppingItem) {
		this.cartItems = this.cartService.removeCartItem(cartItem);
		this.cartTotal = this.cartService.getCartTotal();
		alert(`${cartItem.product.name} has been removed from cart`);
	}
	submitOrder() {
		// transfer cart items into order items
		this.orderService.orderItems = this.cartService.getCartItems();
		// empty the cart
		this.cartItems = this.cartService.emptyCart();
	}
}
