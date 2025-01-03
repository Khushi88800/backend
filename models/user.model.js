import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'fullName shoould be 5 letter'],
        minLength: [5, 'minimum length 5 character'],
        trim: true,
        lowercase: true

    },
    email: {
        type: String,
        required: [true, 'email should be some special character'],
        unique: true,
        lowercase: true,
        unique: ['email has already registered'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
}, {
    timestamps: true
})
userSchema.methods = {
    // method which will help us compare plain password with hashed password and returns true or false
    comparePassword: async function (plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },

    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, role: this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d",
            }
        );
    },
    generatePasswordResetToken: async function () {
        // creating a random token using node's built-in crypto module
        const resetToken = crypto.randomBytes(20).toString('hex');
    
        // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
        this.forgotPasswordToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');
    
        // Adding forgot password expiry to 15 minutes
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min form now bro milliseconds
    
        return resetToken;
      },
};
// console.log('JWT_SECRET:', process.env.JWT_SECRET);

const userModel = mongoose.model('users', userSchema);

export default userModel;