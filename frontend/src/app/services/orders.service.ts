import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import { ORDER_NEW_FOR_CURRENT_USER_URL, ORDERS_CREATE_URL } from '../shared/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  createOrder(order:Order){
   return this.http.post<Order>(ORDERS_CREATE_URL,order)
  }
  getNewUserForCurrentOrder():Observable<Order>{
     return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL)
  }
}
