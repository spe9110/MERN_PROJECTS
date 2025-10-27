import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    role : {
        type: String,
        enum: ['admin', 'merchant'],
        default: 'merchant'
    },
    company: {
        name: String,
        address: String,
        website: String
    },
    plan: {
        name: String, // e.g., 'Free', 'Pro'
        emailQuota: Number, // per month
        smsQuota: Number // per month
    },
    providerSettings: {
        sendGridApiKey: String,
        twilioSid: String,
        twilioAuthToken: String,
        twilioPhone: String
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
)

const User = mongoose.model("User", userSchema);

export default User;