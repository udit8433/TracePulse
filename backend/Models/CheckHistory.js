
import mongoose from "mongoose";

const checkHistorySchema = new mongoose.Schema({
    apiId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Api",
        required: true
    },

    status: {
        type: String,
        enum: ["UP", "DOWN"],
        required: true
    },

    responseTime: {
        type: Number,
        default: 0
    },

    statusCode: {
        type: Number
    },

    checkedAt: {
        type: Date,
        default: Date.now,
        expires: 3 * 24 * 60 * 60
    },

    error: {
        type: String
    }
});

const CheckHistory = mongoose.model(
    "CheckHistory",
    checkHistorySchema
);

export default CheckHistory;
