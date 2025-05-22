import { Component } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../shared/models/order';
import { Route, Router } from '@angular/router';
import { TitleComponent } from "../../partials/title/title.component";
import { CartItemsComponent } from "../../partials/cart-items/cart-items.component";

@Component({
  selector: 'app-payment',
  imports: [TitleComponent, CartItemsComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  order:Order = new Order()
  constructor(private orderService:OrdersService,router:Router){
    orderService.getNewUserForCurrentOrder().subscribe({
      next:(order)=>{
        this.order = order
      },
      error:()=>{
        router.navigateByUrl('/checkout')
      }
    })
  }


}
