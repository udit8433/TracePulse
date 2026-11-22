
import { Worker } from "bullmq";
import bullRedis from "../Configuration/BullRedis.js";
import Api from "../Models/api.js";
import CheckHistory from "../Models/CheckHistory.js";
import axios from "axios";
import connectdb from "../Models/db.js";
import sendEmail from "../Services/Email.js";
import User from "../Models/userschema.js";
import dotenv from "dotenv";
dotenv.config();


//connect to database
await connectdb();
 let prevstatus
 let newstatus
 const monitorWorker = new Worker(
    "Api-monitor",

    async (job) => {

        const { apiId } = job.data;

        const api = await Api.findById(apiId);

        if (!api || !api.isActive) {
            return;
        }
        const previousStatus = api.status;
        const startTime = Date.now();
       
        try {

            const response = await axios.get(api.url, {
                timeout: 5000,
                 validateStatus: () => true
            });

            const responseTime = Date.now() - startTime;
            
            api.statusCode = response.status;
            api.status = response.status >= 200 && response.status < 300? "UP": "DOWN";
            api.responseTime = responseTime;

        } catch (error) {

            const responseTime = Date.now() - startTime;

            api.status = "DOWN";
            api.statusCode = error.response?.status || 0;
            api.responseTime = responseTime;
        }
            const newStatus = api.status;

        // Update latest API status
        //by using promise upadtion and creation can done concurrently
        await Promise.all([
           Api.updateOne( { _id: api._id },
    {
        $set: {
            status: api.status,
            statusCode: api.statusCode,
            responseTime: api.responseTime
        }
    }
),

        // Save monitoring history
     CheckHistory.create({
    apiId: api._id,
    status: api.status,
    statusCode: api.statusCode,
    responseTime: api.responseTime,
       checkedAt: new Date()

})
        ]);


 // Send email only when status changes
    if (previousStatus !== newStatus) {

      try {

        const user = await User.findById(api.userId);

        if (!user || !user.email) {
          console.log("User email not found");
          return;
        }

        if (previousStatus === "UP" && newStatus === "DOWN") {

          await sendEmail(
            user.email,
            "API DOWN ALERT - TracePulse",
            `Hello ${user.name},

Your monitored API is DOWN.

API Name: ${api.name}
API URL: ${api.url}
Status: DOWN

Please check your API.

- TracePulse`
          );

          console.log("DOWN alert email sent");

        }

        else if (
          previousStatus === "DOWN" &&
          newStatus === "UP"
        ) {

          await sendEmail(
            user.email,
            "API RECOVERED - TracePulse",
            `Hello ${user.name},

Good news! Your API is working again.

API Name: ${api.name}
API URL: ${api.url}
Status: UP

- TracePulse`
          );

          console.log("Recovery email sent");

        }

      } catch (emailError) {

        console.error("Email sending failed:", emailError.message);

      }
    }

  },



  {
    connection: bullRedis,
    concurrency: 10
  }
);

monitorWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

monitorWorker.on("failed", (job, error) => {
    console.log(`Job ${job?.id} failed:`, error.message);
});

export default monitorWorker;

