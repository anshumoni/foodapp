import {connect,ConnectOptions} from "mongoose"

export const dbConnect = ()=>{
    connect(process.env.MONGO_DB_URL!,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=> console.log("connect successfully"),
        (error)=>console.log(error)
    )
}