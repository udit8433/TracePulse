
import { redisclient } from "../Configuration/Redis.js";
import jwt from "jsonwebtoken";
import User from "../Models/userschema.js";

const authusermiddleware = async (req, res, next) => {
    try {
        console.log("Received cookies:", req.cookies);
        console.log("Received token:", req.cookies?.token);
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const blockedtoken = await redisclient.get(
            `blocklist:${token}`
        );

        if (blockedtoken) {
            return res.status(401).json({
                message: "Please login again"
            });
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Attach authenticated user to request
        req.user = user;

        next();

    } catch (err) {
        console.error("Authentication Error:", err);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authusermiddleware;
