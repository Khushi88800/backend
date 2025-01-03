import moment from "moment";
import Attendance from "../models/attendence.model.js";

export const clockIn = async (req, res) => {
    try {
      const userId = req.user.id; 
      const now = new Date();
  
      const attendance = new Attendance({
        userId,
        date: now,
        clockIn: now,
      });
  
      await attendance.save();
      res.status(201).json({ message: "Clocked in successfully", attendance });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const clockOut = async (req, res) => {
    try {
        const userId = req.user.id; 
        const now = new Date();

        const attendance = await Attendance.findOne({
            userId,
            date: {
                $gte: moment().startOf("day").toDate(), 
                $lte: moment().endOf("day").toDate(),  
            },
            clockOut: { $exists: false }, 
        });

        if (!attendance) {
            return res.status(404).json({ message: "No open clock-in record found for today." });
        }

        attendance.clockOut = now;

        const workingHours = moment(now).diff(moment(attendance.clockIn), "hours", true);
        attendance.workingHours = parseFloat(workingHours.toFixed(2)); // Save with precision

        await attendance.save();

        res.json({
            message: "Clocked out successfully",
            attendance,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const getAttendanceHistory = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { startDate, endDate } = req.query;

        const query = { userId };

        if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
        if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };

        const attendance = await Attendance.find(query)
            .sort({ date: -1 })
            .limit(30);

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



