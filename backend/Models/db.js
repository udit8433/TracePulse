import mongoose from "mongoose"
import dotenv from "dotenv"

const connectdb=async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connect Successfully ");
}
export default connectdb;