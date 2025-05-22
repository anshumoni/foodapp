import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-items',
  imports: [CommonModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {
   @Input()
   orders!:Order;

   ngOnInit(){
    console.log("orders",this.orders)
   }
}
