import  {signup,login,deleteaccount}  from "../Controllers/usercontroller.js";
import express from "express";
import unauthenicatedRatelimiter from "../Middlewares/unauthenicatedRatelimiter.js";
import { getProfile } from "../Controllers/usercontroller.js";
import authusermiddleware from "../Middlewares/authusermiddleware.js";
import { logout } from "../Controllers/usercontroller.js";

const userrouter=express.Router();
 


 



userrouter.post("/signup",unauthenicatedRatelimiter,signup);
userrouter.post("/login",unauthenicatedRatelimiter,login); 
userrouter.get("/profile",authusermiddleware, getProfile)
userrouter.delete("/delete",deleteaccount); 
userrouter.post("/logout", logout);

export default userrouter; 