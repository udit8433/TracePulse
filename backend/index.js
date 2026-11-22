import  dotenv  from "dotenv";
import express from "express"
import connectdb  from "./Models/db.js";
import userroutes from "./Routes/userroutes.js";
import cors from "cors";
import { connectRedis } from "./Configuration/Redis.js";
import apiroutes from "./Routes/apiroutes.js";
import cookieParser from "cookie-parser";
import analyticsRouter from "./Routes/analyticsRoutes.js";
import "./Workers/monitorscheduler.js";
import "./Workers/monitorworkers.js";
dotenv.config();

 
 
const app=express();

app.use(
  cors({
  origin: "http://localhost:5173",
      credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

app.use("/api/analytics", analyticsRouter);

app.use("/api",apiroutes)


app.use("/user",userroutes);


 
 
const PORT=process.env.PORT;
const startserver= async()=>{
    try{
        await connectdb();
        await connectRedis();

        
        app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
        
    }
    catch(err){
        console.log(err)
    }
} 

startserver();