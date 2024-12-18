import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name shoould be 5 letter'],
        minLength: [5, 'minimum length 5 character'],
        maxLength: [50, 'maximum length 50 character'],
        trim: true

    },
    email: {
        type: String,
        required: [true, 'email should be some special character'],
        unique: true,
        lowercase: true,
        unique: ['email has already registered']
    },
    password: {
        type: String,
        select: false,
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema);

export default userModel;

