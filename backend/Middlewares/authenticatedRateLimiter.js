import { redisclient } from "../Configuration/Redis";


const authenticatedRateLimiter=async(req,res,next)=>{
    try{
    const userid=req.user_id.tostring();

    const key=`rate-limiter:user:${userid}`;

   const requestcount= await redisclient.incr(key);

    if(requestcount==1){
        await redisclient.expire(key,60);
    }
    if(requestcount>7){
        const remainingtime=await redisclient.ttl(key);

        return res.status().json({
            message:`Too many request.Try again after ${remainingtime}`
        })
    }
    next();}
    catch(err){
        console.log("authenticated rate limiter error",err);
        next();
    }
}

export default authenticatedRateLimiter;