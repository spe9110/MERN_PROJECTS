import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model
        required: true
    },
    email: { 
        type: String,
        trim: true
    },
    phone: { 
        type: String,
        trim: true
    },
    firstName: { 
        type: String,
        trim: true
    },
    lastName: { 
        type: String,
        trim: true
    },
    tags: { 
        type: [String], // FIXED: Should be array of String, not array of Array
        default: []
    },
    consent: { 
        type: Boolean, 
        default: false 
    }, // Whether the contact has given consent
    consentSource: {
        type: String,
        trim: true
    }, // Where/when they opted in
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;


/*

Explanation of Each Item
mongoose & Schema import

mongoose is the ODM (Object Data Modeling) library for MongoDB in Node.js.

Schema defines the structure and rules for documents in a MongoDB collection.

owner field

Stores the _id of a User document.

ref: "User" tells Mongoose this field is related to the User model (for population).

Usually required: true if every contact must belong to a user.

email & phone fields

Simple String types with optional trim to clean whitespace.

firstName & lastName

String fields for storing the contact's personal names.

tags field (fixed)

type: [String] means an array of strings (e.g., ["friend", "client"]).

Before, type: [Array] was invalid—an array inside an array isn't what you want.

consent

Boolean to store opt-in status (e.g., for marketing emails).

Defaults to false if not specified.

consentSource

String describing where consent came from (e.g., "Website signup form").

createdAt

Date field storing creation time, defaulting to the moment the document is created.

mongoose.model("Contact", contactSchema)

Registers the schema under the Contact model name.

Creates a MongoDB collection named contacts (lowercased plural form).

export default Contact

Allows importing this model in other files to interact with MongoDB.

*/ 