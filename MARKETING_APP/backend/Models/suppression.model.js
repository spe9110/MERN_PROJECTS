import mongoose from "mongoose";
import { Schema } from "mongoose";

const suppressionSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true
    },
    type: { type: String, enum: ['email', 'sms'] },
    value: String, // email address or phone number
    
    reason: String, // e.g., "user unsubscribed", "hard bounce"
    source: String, // e.g., "unsubscribe link", "manual import"
},
{
    timestamps: true
})

const Suppression = mongoose.model('Suppression', suppressionSchema);

export default Suppression;

/*

7. Suppression (Unsubscribed)
What
Central list of emails/phones that must never be contacted.

Why
Required by law (CAN-SPAM, GDPR) and prevents user errors.



*/ 