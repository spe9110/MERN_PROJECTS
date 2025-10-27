import mongoose from "mongoose";
import { Schema } from "mongoose";

const billingSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    planName: String,
    periodStart: Date,
    periodEnd: Date,
  
    emailUsed: { type: Number, default: 0 },
    smsUsed: { type: Number, default: 0 },
  
    transactions: [{
        date: Date,
        type: { type: String, enum: ['charge', 'refund'] },
        amount: Number,
        description: String
    }]
});

const Billing = mongoose.model('Billing', billingSchema);

export default Billing;