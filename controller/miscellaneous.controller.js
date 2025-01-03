import Attendance from "../models/attendence.model.js";
import leaveApplication from "../models/leaveApplication.model.js";
import userModel from "../models/user.model.js";

/**
 * @USER_STATS_ADMIN
 * @ROUTE @GET {{URL}}/api/v1/admin/stats/users
 * @ACCESS Private(ADMIN ONLY)
 */
export const userStats = async (req, res, next) => {
    const allUsersCount = await userModel.countDocuments();
    const allLeavesCount = await leaveApplication.countDocuments();
    const allAttendenceCount=await Attendance.countDocuments();

    // Returning the total count of all users to the client

    res.status(200).json({
        success: true,
        message: 'All registered users count',
        allUsersCount,
        allLeavesCount,
        allAttendenceCount,
    });
};
