import { model, Schema } from "mongoose";

const documentSchema = new Schema({
    panCard: {
        type: String,
        required: true,
        // unique: true,
        uppercase: true,

    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, 'Phone number should be 10 digit'],
        validate: {
            validator: function (value) {
                return /\d{10}/.test(value);
            },
            message: 'Phone number should be in the format 1234567890'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const currentDate = new Date();
                const age = currentDate.getFullYear() - value.getFullYear();
                const m = currentDate.getMonth() - value.getMonth();
                if (m < 0 || (m === 0 && currentDate.getDate() < value.getDate())) {
                    age--;
                }
                return age >= 18;
            },
            message: 'Employee must be at least 18 years old'
        }
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minlength: [3, 'City must be atleast 3 characters long'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    zipCode: {
        type: String,
        required: [true, 'Zip Code is required'],
    }
}, {
    timestamps: true,
})

const EmployeeDocument = model('EmployeeDocument', documentSchema);

export default EmployeeDocument;