import mongoose from "mongoose";

// Define Payroll Schema
const payrollSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", 
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    bankAccount: {
        type: String,
        required: true,
        unique: true,
    },
    bankIFSCode: {
        type: String,
        required: true,
    },
 
}, {
    timestamps: true,
});

// Create Payroll Model
const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;