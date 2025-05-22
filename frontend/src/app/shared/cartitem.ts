import { Food } from "./models/food";

export class CartItem{
    food!:Food;
    price!:number;
    constructor(public fd:Food){ 
        this.food = fd;
        this.price = fd.price
    }
    quantity:number =1;
   // price:number = this.food.price
}