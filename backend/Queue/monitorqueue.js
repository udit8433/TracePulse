import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

const monitorqueue = new Queue("Api-monitor", {
    connection
});

export default monitorqueue;