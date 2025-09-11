import { Router } from "express";
import { sample_users } from "../data";
import asyncHandler from "express-async-handler"

import jwt from "jsonwebtoken"
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../http_status";
import bycrypt from "bcryptjs"

const router = Router()


router.get("/seed",asyncHandler(
    async (req,res)=>{
      const userCount = await UserModel.countDocuments()
      if(userCount>0){
        res.send("Seed is already done")
        return
      }
      await UserModel.create(sample_users);
      res.send("Seed is done successfully")
    }
))

router.post("/login",(req,res)=>{
    const body = req.body;
    const user = sample_users.find((usr)=>usr.email===body.email && usr.password===body.password)
    if(user){
    res.send(generatejsontoken(user))
    }else{
     res.status(400).send("User or password is not found")
    }
 })

 router.post('/register',asyncHandler(
   async(req,res)=>{
     const {name,email,password,address} = req.body
     let userExist = await UserModel.findOne({email})
     if(userExist){
      res.status(HTTP_BAD_REQUEST)
      res.send("User is already exist Already logged in")
     }
     let encryptpass = await bycrypt.hash(password,10);

     let newUser:User={
      id:'',
      name,
      email:email.toLowerCase(),
      password:encryptpass,
      address,
      isAdmin:false
     }
     const dbUser = await UserModel.create(newUser)
     res.send(generatejsontoken(dbUser))
   }
 ))
 const generatejsontoken=(user:any)=>{
   const token =jwt.sign({
     email:user.email,isAdmin:user.isAdmin,
   },"Somerandomtext",{expiresIn:'30d'})
   user.token = token;
   return user
 }

 export default router;