
import Api from "../Models/api.js";
import axios from "axios";

import  monitorqueue  from "../Queue/monitorqueue.js";

export const addapi = async (req, res) => {
    try {
        const { url, name } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "API URL is required"
            });
        }

        if (!req.user) {
    return res.status(401).json({
        message: "User not authenticated"
    });
}

        let parsedUrl;

        try {
            //convert user url to valid url object and extarct its components like protocol,port,hostname,pathname
            parsedUrl = new URL(url);
        } catch {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).json({
                message: "Only HTTP and HTTPS URLs are allowed"
            });
        }
         //return time in milliseconds
        const startTime = Date.now();

        let status = "DOWN";
        let statusCode = 0;

        try {
            const response = await axios.get(parsedUrl.href, {
                timeout: 10000,
                maxRedirects: 0,
                validateStatus: () => true
            });

            statusCode = response.status;

            if (statusCode >= 200 && statusCode < 400) {
                status = "UP";
            }

        } catch (error) {
            console.log("Monitoring error:", error.message);
        }

        const responseTime = Date.now() - startTime;

        const newApi = await Api.create({
            name: name || "My API",
            url: parsedUrl.href,
            status,
            responseTime,
            statusCode,
            userId: req.user._id,
            isActive: true,
            interval: 60000
        });

        // Schedule recurring health checks
        await monitorqueue.add(
            "check-api",
            {
                apiId: newApi._id.toString()
            },
            {
                repeat: {
                    every: newApi.interval
                },
                jobId: `api-${newApi._id}`
            }
        );

        return res.status(201).json({
            message: "API added successfully",
            api: newApi
        });

    } catch (error) {
    console.error("ADD API ERROR:", error);

    return res.status(500).json({
        message: "Server error",
        error: error.message
    });
}
};

export const getallapis = async (req, res) => {
    try {
        const apis = await Api.find({
            userId: req.user._id
        });

        return res.status(200).json({
            success: true,
            apis
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteApi = async (req, res) => {
  try {
   const { id } = req.params;

    const deletedApi = await Api.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!deletedApi) {
      return res.status(404).json({
        message: "API not found"
      });
    }

    return res.status(200).json({
      message: "API deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

