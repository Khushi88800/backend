import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },

},{
    timestamps: true,  
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
export default EmployeeModel;