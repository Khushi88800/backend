import mongoose, { Schema, model } from "mongoose";

const salarySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required and should be at least 5 characters long"],
            minLength: [5, "Minimum length is 5 characters"],
            trim: true,
            lowercase: true,
        },
        type: {
            type: String,
            enum: ["Debit", "Credit"], // Restrict values to Debit or Credit
            required: [true, "Transaction type is required"],
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be at least 1"],
        },
        date: {
            type: Date,
            required: [true, "Transaction date is required"],
        },
        details: {
            type: String,
            required: [true, "Transaction details are required"],
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

// Define and export the model
const SalaryData = model("EmployeeSalary", salarySchema);
export default SalaryData;