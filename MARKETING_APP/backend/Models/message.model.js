import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    campaignId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaign' 
    },
    contactId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Contact' },
    type: {
        type: String,
        enum: ["email", "sms"],
        required: true
    },
    status: {
        type: String,
        enum: [
            "queued",
            "sent",
            "delivered",
            "opened",
            "clicked",
            "bounced",
            "failed"
        ],
        default: "queued"
    },
    providerMessageId: {
        type: String,
        default: ""
    },
    error: {
        type: String,
        default: ""
    },
    events: [
        {
            name: { type: String, required: true }, // e.g., "delivered"
            timestamp: { type: Date, required: true },
            meta: { type: Object, default: {} }
        }
    ]
},
{
    timestamps: true // adds createdAt and updatedAt automatically
}
)

const Message = mongoose.model("Message", messageSchema);

export default Message;

/*
What
Stores each send attempt and provider feedback (delivery, open, click).

Why
Audit trail, debugging, analytics, and compliance.

Explanation of Each Item
campaignId

Links the message to a specific campaign.

ref: "Campaign" enables population from the Campaign model.

required: true ensures every message is tied to a campaign.

contactId

Links the message to a contact.

ref: "Contact" enables population from the Contact model.

Required to ensure we always know the recipient.

type

Either "email" or "sms".

Required because sending logic depends on the type.

status

Tracks message state (queued → sent → delivered → etc.).

Defaults to "queued" for newly created messages.

providerMessageId

Stores the ID returned by an external provider (e.g., Twilio, SendGrid).

Default empty string to avoid undefined.

error

Captures provider or system error messages for failed sends.

Defaults to "".

events

Array of activity records for the message lifecycle.

name: Event type (delivered, opened, etc.).

timestamp: When the event occurred.

meta: Additional metadata (e.g., IP, device info).

timestamps: true

Automatically adds createdAt and updatedAt fields.

mongoose.model("Message", messageSchema)

Registers the Message model in Mongoose.

Collection name will be messages.

export default Message

Makes the model available for imports elsewhere.

*/ 