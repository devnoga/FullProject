import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
	@Input() product: Product;

	quantity: number = 1;

	constructor(private cartService: CartService) {
		this.product = { id: 1, name: '', price: 0.0, url: '', description: '' };
	}

	ngOnInit(): void {}

	addToCart() {
		this.cartService.addToCart(this.product, this.quantity);
	}
}
