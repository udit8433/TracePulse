import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
 
const redisclient=createClient({
    url:process.env.REDIS_URL
})

redisclient.on("error",(error)=>{
    console.log("redis error:",error)
})

const connectRedis=async()=>{
    await redisclient.connect()
    console.log("Redis Connected Sucessfully")
}

export{connectRedis,redisclient};


