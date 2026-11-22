import { Queue } from "bullmq";
import bullRedis from "../Configuration/BullRedis.js";
import connectdb from "../Models/db.js";
import Api from "../Models/api.js";

await connectdb();

const apiQueue = new Queue("Api-monitor", {
    connection: bullRedis
});

async function scheduleChecks() {
    try { //fetch only id of api in one query
        const apis = await Api.find({ isActive: true })
            .select("_id")
            .lean();

        if (apis.length === 0) {
            console.log("No active APIs found");
            return;
        }
    //creating job at one time
        const jobs = apis.map((api) => ({
            name: "check-api",
            data: {
                apiId: api._id.toString()
            },
            opts: {
                jobId: `api-${api._id}-${Date.now()}`,
                removeOnComplete: true,
                removeOnFail: 100
            }
        }));
        //adding all jobs to queue in one time to reduce queue operation
        await apiQueue.addBulk(jobs);

        console.log(`Scheduled ${apis.length} API checks`);

    } catch (error) {
        console.error("Scheduling error:", error);
    }
}
console.log("Scheduler started");

await scheduleChecks();

setInterval(() => {
    console.log("Next scheduling cycle:", new Date().toLocaleTimeString());
    scheduleChecks();
}, 120000);