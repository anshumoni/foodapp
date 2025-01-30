import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler"
import { FoodModel } from "../models/data.model";

const route = Router()


route.get("/seed",asyncHandler(
    async (req,res)=>{
      const foodCount = await FoodModel.countDocuments()
      if(foodCount>0){
        res.send("Seed is already done")
        return
      }
      await FoodModel.create(sample_foods);
      res.send("Seed is done successfully")
    }
))
//create food api
route.get("/",asyncHandler(
    async (req,res)=>{
     const food = await FoodModel.find()   
    res.send(food)

})
)
//create search api
route.get("/search/:searchterm",asyncHandler(
    async (req,res)=>{
    const searchReg = new RegExp(req.params.searchterm,'i')
    const foods = await FoodModel.find({name:{$regex:searchReg}})
    res.send(foods)
 })
)

route.get("/tags",asyncHandler(
    async (req,res)=>{
     const tags = FoodModel.aggregate([
        {
            $unwind:'$tags'
        },
        {
            $group:{
                _id:'tags',
                count:{$sum:1}
            }
        },
        {
            $project:{
                _id:0,
                name:'$_id',
                count:'$count'
            }
        }
    ]).sort({count:-1})  

    const all = {
        name:'All',
        count:await FoodModel.countDocuments()
    }
    
     ;(await tags).unshift(all)
    res.send(tags)
  })
)

route.get("/tagesname",asyncHandler(
    (req,res)=>{
   const foodbytag = FoodModel.find({tags:req.params.tagesname})
   res.send(foodbytag)
})
)
//get food by id
route.get("/:foodid",asyncHandler(
    async (req,res)=>{
    const foodId = await FoodModel.findById(req.params.foodId)
    res.send(foodId)
})
)

export default route;