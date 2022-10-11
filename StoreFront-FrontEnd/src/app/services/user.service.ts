import { Injectable } from '@angular/core';
import { UserData } from '../models/UserData';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	user: UserData = {
		fullName: '',
		address: '',
		cardNumber: 0,
	};
	constructor() {}
}
