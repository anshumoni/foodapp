import {model,Schema,Types} from "mongoose";
import { Food, FoodModel, FoodSchema } from "./data.model";
import { OrderstatusEnum } from "./order_status";

export interface LatLng{
    lat:string;
    lng:string
}

export const LatlngSchema = new Schema<LatLng>({
    lat:{type:String,required:true},
    lng:{type:String,required:true}
})

export interface OrderItem {
    food:Food;
    price:string;
    quantity:number
}

export const OrderItemSchema = new Schema<OrderItem>({
    food:{type:FoodSchema,required:true},
    price:{type:String,required:true},
    quantity:{type:Number,required:true}
})

export interface Order{
    id:number;
    items:OrderItem[];
    totalPrice:number;
    name:string;
    address:string;
    addressLatLng?:LatLng;
    paymentId:string;
    status:OrderstatusEnum;
    User:Types.ObjectId;
    createdAt:Date;
    updateAt:Date;
}
export const OrderSchema = new Schema<Order>({
    name:{type:String,required:true},
    address:{type:String,required:true},
    addressLatLng:{type:String,required:true},
    paymentId:{type:String},
    totalPrice:{type:Number,required:true},
    items:{type:[OrderItemSchema],required:true},
    status:{type:String,dafault:OrderstatusEnum.NEW},
    User:{type:Schema.Types.ObjectId,required:true}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

export const OrderModel = model('order',OrderSchema)