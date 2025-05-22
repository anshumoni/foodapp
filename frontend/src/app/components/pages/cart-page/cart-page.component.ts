import { Component } from '@angular/core';
import { Cart } from '../../../shared/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/cartitem';
import { TitleComponent } from "../../partials/title/title.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";

@Component({
  selector: 'app-cart-page',
  imports: [TitleComponent, CommonModule, RouterLink, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
cart!:Cart;
isCarthaveitem:boolean = false;

constructor(private cartservice:CartService){
  this.cartservice.getCartObservable().subscribe((cart)=>{
    this.cart = cart;
    this.isCarthaveitem = true;
    //console.log("cartitem",this.cart)
  })
}

removeItem(cartItem:CartItem){
   this.cartservice.removeFromCart(cartItem.food.id)
   if(!this.cart.item.length) this.isCarthaveitem = false;
}

changeQty(cartItem:CartItem,qtyinstring:string){
    let qty = parseInt(qtyinstring);
   this.cartservice.changeQuantity(cartItem.food.id,qty)
}

}
