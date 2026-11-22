import CheckHistory from "../Models/CheckHistory.js";
import Api from "../Models/api.js";

export const getResponseHistory = async (req, res) => {
    try {
        const { apiId } = req.params;

        // Verify that this API belongs to logged-in user
        const api = await Api.findOne({
            _id: apiId,
            userId: req.user._id
        });

        if (!api) {
            return res.status(404).json({
                success: false,
                message: "API monitor not found"
            });
        }

        // Fetch individual API history
        const history = await CheckHistory.find({
            apiId: apiId
        })
        .sort({ checkedAt: -1 })
        .limit(20) 
        .select("responseTime status statusCode checkedAt");
        
          history.reverse();
        return res.status(200).json({
            success: true,
            history
        });

    } catch (error) {
        console.log("Analytics error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};