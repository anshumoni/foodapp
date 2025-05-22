import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-foodpage',
  imports: [CommonModule, RouterLink],
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css'
})
export class FoodpageComponent {

  food!:any;
  constructor(activateRoute:ActivatedRoute,
    foodservice:FoodService,
    private router:Router,
    private cartservice:CartService){
    activateRoute.params.subscribe((param)=>{
       if(param['id']){
        foodservice.getFoodById(param['id']).subscribe((servefood)=>{
          this.food = servefood
        })
       }
    })
  }

    addtoCart(){
      console.log("food",this.food)
      this.cartservice.addtocart(this.food)
      this.router.navigateByUrl('/cart-page')
    }
  

}
