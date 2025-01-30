import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import foodRouter from "./routers/food.router"
import { dbConnect } from "./configs/database.config"

dbConnect()

const app = express()

app.use(cors({
 credentials:true,
 origin:["http://localhost/4200"]
}))
app.use("/api/food",foodRouter)
const port = 5000
app.listen(port,()=>{
    console.log("Website serve on http://localhost:"+port)
})