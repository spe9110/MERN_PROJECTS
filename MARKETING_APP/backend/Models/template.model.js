import mongoose from "mongoose";
import { Schema } from "mongoose";

const templateSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        enum: ["email", "sms"],
        required: true
    },
    subject: {
        type: String,
        trim: true,
        default: "" // used only for email templates
    },
    bodyHtml: {
        type: String,
        default: "" // HTML version of email
    },
    bodyText: {
        type: String,
        default: "" // SMS text or plain text fallback
    }
},
{
    timestamps: true // adds createdAt and updatedAt automatically
}
);

const Template = mongoose.model('Template', templateSchema);

export default Template;

/*

Explanation of Each Item
import mongoose & { Schema }

Mongoose provides schema definition and data modeling for MongoDB.

Schema is extracted for cleaner code.

owner

Links the template to the user who created it.

Uses Schema.Types.ObjectId for MongoDB document references.

ref: "User" enables population from the User model.

required: true ensures templates always belong to a user.

name

The template’s display name.

trim: true removes extra whitespace.

required: true ensures a template always has a name.

type

Limits to "email" or "sms" with enum.

required: true ensures type is always specified.

subject

Used only for email templates.

Optional but defaults to an empty string to avoid undefined.

bodyHtml

Stores HTML content for email templates.

Defaults to an empty string to keep the schema consistent.

bodyText

Stores SMS text or the plain-text version of email.

Defaults to "" so the field is always present.

timestamps: true

Automatically adds createdAt and updatedAt.

mongoose.model("Template", templateSchema)

Creates the Template model, mapping to the templates collection.

export default Template

Makes the model available for use elsewhere.

*/ 