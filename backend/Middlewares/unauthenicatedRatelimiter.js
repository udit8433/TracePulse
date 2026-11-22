
import { redisclient } from "../Configuration/Redis.js";

const unauthenicatedRatelimiter=async(req,res,next)=>{
    try{
    const key=`rate-limit:ip:${req.ip}`;

    const requestcount=await redisclient.incr(key);

    if(requestcount==1)
    {
        await redisclient.expire(key,60);
    }
    if(requestcount>6){
        const remainingtime=await redisclient.ttl(key);

        return res.status(429).json({
            message:`Too many request.Try again after ${remainingtime}`
        })
    }
    next();
}
   catch(err){
    console.log("Unauthenticated rate limiter error",err)

    next();

}
}

export default unauthenicatedRatelimiter;