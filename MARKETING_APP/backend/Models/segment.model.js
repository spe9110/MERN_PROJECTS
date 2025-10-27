import mongoose from "mongoose";
import { Schema } from "mongoose";

const segmentSchema = new Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    
    name: {
        type: String
    },
    type: { 
        type: String, 
        enum: ['dynamic', 'static'], 
        default: 'dynamic' 
    },    
    filter: {
            type: Object,
            default: {}
    }, // JSON filter (e.g., { tags: 'VIP', consent: true })
    contactIds: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Contact' 
        }
    ], // for static
    
    createdAt: { type: Date, default: Date.now }
})

const Segment = mongoose.model('Segment', segmentSchema);

export default Segment;

/*

Saved filters or static lists of contacts.

Why
Allows merchants to target a subset of contacts without re-filtering each time.

Explanation of Each Item
import mongoose & { Schema }

Imports the Mongoose ODM and extracts Schema for defining schema structure.

owner

Stores the _id of the user who owns the segment.

ref: "User" links to the User model for population.

required: true ensures every segment belongs to a user.

name

Segment name.

trim: true removes extra spaces.

required: true ensures all segments have a name.

type

Restricts value to "dynamic" or "static" using enum.

Defaults to "dynamic" if not specified.

filter

Stores a JSON object describing filtering criteria (e.g., { tags: "VIP" }).

Defaults to {} to avoid undefined errors.

contactIds

Array of ObjectIds referencing the Contact model.

Used only for "static" segments where contacts are explicitly listed.

timestamps: true

Automatically adds createdAt and updatedAt fields.

This removes the need to manually define createdAt.

mongoose.model("Segment", segmentSchema)

Registers the schema as the Segment model.

Creates a segments collection in MongoDB.

export default Segment

Makes the model available for importing elsewhere in the codebase.

*/ 