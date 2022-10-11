import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-order-confirmation',
	templateUrl: './order-confirmation.component.html',
	styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
	userName: string = '';
	orderTotal: number = 0.0;

	constructor(
		private userService: UserService,
		private ordersService: OrdersService
	) {}

	ngOnInit(): void {
		this.userName = this.userService.user.fullName;
		this.orderTotal = this.ordersService.getOrderTotal();
	}
}
