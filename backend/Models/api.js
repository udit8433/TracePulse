import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "UNKNOWN"
    },
    responseTime: {
        type: Number,
        default: 0
    },
    statusCode: {
        type: Number,
        default: 0
    },
    isActive: {
    type: Boolean,
    default: true
},
interval: {
    type: Number,
    default: 1200000
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
}, { timestamps: true });

const Api=mongoose.model("Api",apiSchema);
export default Api;