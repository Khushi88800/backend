import mongoose from "mongoose";

const leaveApplicationSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        required: true,
        // enum: ['Annual', 'Sick', 'Personal', 'Other']
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    isHalfDay: {
        type: Boolean,
        default: false
    },
    halfDayType: {
        type: String,
        enum: ['First Half', 'Second Half'],
        required: function () {
            return this.isHalfDay;
        }
    },
    numberOfDays: {
        type: Number,
        required: true
    },

    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    workingFromHome: {
        type: Boolean,
        default: false
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }, // Reference to User model

}, {
    timestamps: true,
});


const leaveApplication = mongoose.model('ApplyLeaveData', leaveApplicationSchema);


export default leaveApplication;