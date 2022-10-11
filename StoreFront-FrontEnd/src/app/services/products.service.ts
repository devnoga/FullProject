import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	constructor(private http: HttpClient) {}
	getProducts(): Observable<Product[]> {
		// return this.http.get<Product[]>('/assets/data.json');

		//Full application Code
		// const productsURL = 'http://localhost:3000/products';
		const serverURL =
			'http://storefront-backend-dev.us-east-1.elasticbeanstalk.com';
		return this.http.get<Product[]>(`${serverURL}/products`);
	}
	// getProductDetails(id: number): Product {
	// 	// let params = new HttpParams().set('id', '1');
	// 	let product: Product = new Product();
	// 	this.http.get<Product[]>(`/assets/data.json`).subscribe((data) => {
	// 		product = data.filter((product) => product.id === id)[0];
	// 	});
	// 	return product;
	// }
}
