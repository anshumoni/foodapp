import { Router } from "express";
import asyncHandler from "express-async-handler"
import { HTTP_BAD_REQUEST } from "../http_status";
import { FoodModel } from "../models/data.model";
import { OrderstatusEnum } from "../models/order_status";
import auth from "../middlewares/auth.mid"
import { OrderModel } from "../models/order.model";

const router = Router()
router.use(auth)

router.post("/createOrder",
    asyncHandler(
        async(req:any,res:any)=>{
            const reqBody = req.body;
          if(req.body.items.length<=0){
            res.status(HTTP_BAD_REQUEST).send("Cart is empty")
            return
          }
          await FoodModel.deleteOne({
            user:req.user.id,
            status:OrderstatusEnum.NEW
          })
          const newOrder = new FoodModel({...reqBody,user:req.user.id})
          await newOrder.save()
          res.send(newOrder)
    }
)
)

router.get('/newOrderforCurrentUser',asyncHandler(
  async(req:any,res:any)=>{
    const order = await OrderModel.findOne({user:req.user.id,status:OrderstatusEnum.NEW})
    if(order) res.send(order)
    else res.status(HTTP_BAD_REQUEST).send();     
  }))

  router.get('/trackapi:orderid',asyncHandler(
    async(req:any,res:any)=>{
      const orderbyid = await OrderModel.findById(req.param.id)
      res.send(orderbyid)
    }
  ))
export default router;

