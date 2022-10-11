import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserData } from '../models/UserData';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
	user: UserData = new UserData();

	validCardNumber: boolean = false;

	@Output() submitOrder: EventEmitter<any> = new EventEmitter();

	submitted = false;

	constructor(private userService: UserService, private route: Router) {}

	ngOnInit(): void {}

	onSubmit() {
		alert('Sumbit!');
		// save the user data using the UserService
		this.userService.user = this.user;
		// emit an event to empty the cart
		this.submitOrder.emit();
		//navigate to the order confirmation page
		this.route.navigate(['/confirm']);
	}
	validateCardNumber(arg: any) {
		// alert(arg.toString().length);
		if (arg.toString().length === 16) this.validCardNumber = true;
		else this.validCardNumber = false;
		// alert(this.validCardNumber);
	}
}
