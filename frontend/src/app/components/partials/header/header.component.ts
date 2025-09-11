import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  cartQuantity=0;
  userdata!:User
  constructor(cartService:CartService,private userService:UserService){
    cartService.getCartObservable().subscribe((cart)=>{
      this.cartQuantity = cart.totalcount;
    })
    userService.userObservable.subscribe((newuser)=>{
      this.userdata =newuser;
    })
  }
  logout(){
    this.userService.logout()
  }
  get isAuth(){
    return this.userdata.token
  }
}
