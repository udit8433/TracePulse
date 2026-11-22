import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const bullRedis = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

bullRedis.on("connect", () => {
    console.log("BullMQ Redis Connected");
});

bullRedis.on("error", (err) => {
    console.log("BullMQ Redis Error:", err.message);
});

export default bullRedis;