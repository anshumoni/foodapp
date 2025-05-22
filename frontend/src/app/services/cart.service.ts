import { Injectable } from '@angular/core';
import { Cart } from '../shared/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalstorage()
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart)
  constructor() { }

  addtocart(food:Food):void{
    let cartitem = this.cart.item.find(item=>item.food.id===food.id)
    if(cartitem) return
    this.cart.item.push(new CartItem(food))
    this.setCartToLocalstorage()
  }

  removeFromCart(foodid:string):void{
    this.cart.item = this.cart.item.filter(item=>item.food.id!==foodid)
    this.setCartToLocalstorage()
  }

  changeQuantity(foodid:string,qty:number){
    let cartitem = this.cart.item.find(item=>item.food.id==foodid)
    if(!cartitem) return
    cartitem.quantity = qty;
    cartitem.price = qty*cartitem.food.price
    this.setCartToLocalstorage()
  }

  clearCart(){
    this.cart = new Cart()
    this.setCartToLocalstorage()
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable()
  }
  getCart():Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalstorage(){
    this.cart.totalprice = this.cart.item.reduce((prevcnt,nextcnt)=>prevcnt+nextcnt.price,0)
    this.cart.totalcount= this.cart.item.reduce((prevcnt,nextcnt)=>prevcnt+nextcnt.quantity,0)
    let jsonstr = JSON.stringify(this.cart)
    localStorage.setItem('cart',jsonstr);
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalstorage():Cart{
      let jsonitem=localStorage.getItem('Cart')
      return jsonitem?JSON.parse(jsonitem):new Cart()
  }
}
