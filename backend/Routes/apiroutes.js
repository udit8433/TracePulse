import { addapi } from "../Controllers/apicontroller.js";
import express from "express"
import authusermiddleware from "../Middlewares/authusermiddleware.js";
import { getallapis } from "../Controllers/apicontroller.js";
import { deleteApi } from "../Controllers/apicontroller.js";

const apirouter=express.Router();

apirouter.post("/add",authusermiddleware,addapi);
apirouter.get("/all",authusermiddleware, getallapis);
apirouter.delete("/:id",authusermiddleware,deleteApi)

export default apirouter;