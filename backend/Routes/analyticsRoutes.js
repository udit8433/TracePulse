import express from "express";

import {   getResponseHistory} from "../Controllers/analyticsController.js";
import authusermiddleware from "../Middlewares/authusermiddleware.js";

const analyticsRouter = express.Router();

analyticsRouter.get(
    "/response-time/:apiId",
    authusermiddleware,
    getResponseHistory
);

export default analyticsRouter;