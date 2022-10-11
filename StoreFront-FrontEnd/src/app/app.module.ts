import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './product-item/product-item.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { NavComponent } from './nav/nav.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './cart-item/cart-item.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

@NgModule({
	declarations: [
		AppComponent,
		ProductsComponent,
		ProductItemComponent,
		NavComponent,
		CartComponent,
		ProductDetailsComponent,
		CartItemComponent,
		UserFormComponent,
		OrderConfirmationComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		HttpClientModule,
		MatGridListModule,
		FormsModule,
		FlexLayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
