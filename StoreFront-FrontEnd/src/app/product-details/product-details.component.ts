import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
	product: Product = new Product();
	productId: number = 1;
	quantity: number = 1;
	cartService: CartService;
	constructor(
		private route: ActivatedRoute,
		private productsService: ProductsService,
		private cartServices: CartService
	) {
		this.cartService = cartServices;
	}

	ngOnInit(): void {
		this.productId = parseInt(this.route.snapshot.paramMap.get('id') || '');
		this.productsService.getProducts().subscribe((data) => {
			this.product = data.filter((p) => p.id === this.productId)[0];
		});
	}
	addToCart() {
		this.cartServices.addToCart(this.product, this.quantity);
	}
}
