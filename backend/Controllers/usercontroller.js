import User from "../Models/userschema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
 
const createtoken=(id,email)=>{
        if(!process.env.JWT_SECRET){
            throw new Error("JWT Secret is missing");
            
        }

        const token=jwt.sign({id,email},process.env.JWT_SECRET,{expiresIn:"1h"})
        return token;
    }

    const CookiesOption = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000
};

export const signup=async(req,res)=>{
   
    try{
    const {name,email,password}=req.body;

    const user=await User.findOne({email});

    if(user){
       return  res.status(409).json({
            message:"Email Id already exist",
        })
    }

    const hashpassword=await bcrypt.hash(password,10);

    const usercreated=await User.create({
        name,email,password:hashpassword 
    });

      const token=createtoken(usercreated._id,email);

      res.cookie("token",token,CookiesOption);
      
    res.status(201).json({
        mesaage:"User Created Succesfully"
    })
}
  catch(err){
    console.log(err);
    res.status(500).json({
        message:"Internal Server Error"
    })
  }




}


export const login=async(req,res)=>{
    try{
    const {email,password}=req.body;

    const userexist=await User.findOne({email});

    if(!userexist){
        return res.status(404).json({
            message:"user does not exist"
        })
    }

    const isMatch=await bcrypt.compare(password,userexist.password);

    if(!isMatch){
       return res.status(500).json({message:"Invalid Creddentials"})
    }

    const token=createtoken(userexist._id,email);
    res.cookie("token", token, CookiesOption);


        return res.status(200).json({
            message: "Login successful"
        });
}
    catch(err){
        console.log(err); 
        return res.status(500).json({message:"Internal Server Error"})
    }

}


export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            name: req.user.name,
            email: req.user.email,
            age: req.user.age
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteaccount=async(req,res)=>{
   try{
    const userid=req.user._id

    await User.deleteOne({
        _id:userid
    })

    res.status(201).json({message:"User deleted sucessfully"})
   }
catch(err){
    res.status(500).json({message:"internal server error"})
}    
}

export const logout = async (req, res) => {
    try {
       res.clearCookie("token", CookiesOption);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
