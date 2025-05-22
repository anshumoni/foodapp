import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from "../../partials/title/title.component";
import { CommonModule } from '@angular/common';
import { InputTextComponent } from "../../partials/input-text/input-text.component";
import { CartItemsComponent } from "../../partials/cart-items/cart-items.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { MapComponent } from '../../partials/map/map.component';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps'



@Component({
  selector: 'app-checkout-page',
  imports: [TitleComponent, ReactiveFormsModule,
    CommonModule, InputTextComponent, CartItemsComponent,MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit{
  order:Order = new Order();
  checkoutform!:FormGroup;
  constructor(private formbuilder:FormBuilder,
    private cartservice:CartService,
    private orderService:OrdersService,
    private route:Router,
    private userService:UserService,private toasterservice:ToastrService){
      const cart = cartservice.getCart()
      this.order.items = cart.item;
      this.order.totalPrice = cart.totalprice;

    }
  ngOnInit(): void {
    let {name,address} = this.userService.getCurrentUser();
      console.log("name.............",name)
      this.checkoutform = this.formbuilder.group({
        username:[name,[Validators.required]],
        useraddress:[address,[Validators.required]]
      })
  }
    
    get fc(){
      return this.checkoutform.controls
    }
    
    setLatLngMap(val:any){
      console.log("latlng",val)
      this.order.addressLatLng = val;
    }

    createOrder(){
      if(this.checkoutform.invalid){
        this.toasterservice.warning("Please fill the input","Invalid Input");
        return
      }
     
      this.order.name = this.fc['username'].value;
      this.order.address = this.fc['useraddress'].value;
      //this.order.addressLatLng = {'latitude':22.2736308,longitude:70.7512555}
      console.log("order..........",this.order)
      this.orderService.createOrder(this.order).subscribe({
        next:()=>{
          this.toasterservice.success("Order Created","Order Done")
          this.route.navigateByUrl('/payment')
        },
        error:(errorResponse:any)=>{
          this.toasterservice.error(errorResponse,"Error")
        }
      })
      console.log(this.order)
    }

   
}
