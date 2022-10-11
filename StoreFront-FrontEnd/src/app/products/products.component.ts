import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
	products: Product[] = [];
	constructor(private productService: ProductsService) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe({
			next: (data) => {
				this.products = data;
				alert(data);
			},
			error: (e) => alert(e.message),
			complete: () => console.info('complete'),
		});
	}
}
