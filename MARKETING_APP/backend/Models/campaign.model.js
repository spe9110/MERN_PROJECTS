import mongoose from "mongoose";
import { Schema } from "mongoose";

const campaignSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true
    },
    name: {
        type: String
    },
    type : {
        type: String,
        enum:  ["email", "sms", "both"]
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template", // References the Template model
        required: true
    },
    segmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Segment',
    },
    targetQuery: {
        type: Object,
        default: {}
    },
    scheduleAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ["draft", "scheduled", "running", "completed", "failed"],
        default: "draft"
    },
    metrics: {
        sent: { type: Number, default: 0 },
        delivered: { type: Number, default: 0 },
        opened: { type: Number, default: 0 },
        clicked: { type: Number, default: 0 }
    }
},
{
    timestamps: true // adds createdAt and updatedAt automatically
}
);

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;


/*

Explanation of Each Item
import mongoose & const { Schema } = mongoose

Imports Mongoose ODM and extracts Schema for convenience.

owner

Schema.Types.ObjectId links this campaign to a User.

ref: "User" enables population from the User model.

required: true ensures every campaign belongs to a user.

name

String for campaign’s name.

trim: true removes extra spaces.

Required to ensure campaigns always have a name.

type

Enum restricts values to "email", "sms", or "both".

Required because campaign type is essential.

templateId (corrected from TemplateId)

Schema.Types.ObjectId references a Template document.

ref: "Template" links to Template model.

Required because a campaign must use a template.

targetQuery

type: Object stores filters or query conditions for targeting contacts.

Defaults to {} so it’s never undefined.

scheduleAt

Date when the campaign should start.

status

Enum with allowed states: "draft", "scheduled", "running", "completed", "failed".

Defaults to "draft" for new campaigns.

metrics

Stores numeric tracking data:

sent: Number of messages sent.

delivered: Delivered successfully.

opened: Open events (email only).

clicked: Click-through events.

Each has a default: 0 to prevent undefined values.

timestamps: true

Automatically adds createdAt and updatedAt fields without manually defining them.

mongoose.model("Campaign", campaignSchema)

Registers schema as a Campaign model.

MongoDB will store it in the campaigns collection.

export default Campaign

Makes the model available for importing elsewhere.

*/ 