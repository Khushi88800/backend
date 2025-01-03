import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    clockIn: {
        type: Date,
        required: true
    },
    clockOut: {
        type: Date
    },
    note: {
        type: String
    },
}, {
    timestamps: true
});

const Attendance = mongoose.model('EmpAttendance', attendanceSchema);


export default Attendance