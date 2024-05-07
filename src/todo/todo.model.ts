import mongoose, { SchemaTypes, Types } from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: SchemaTypes.String,
    description: SchemaTypes.String,
    completed: {
        type: SchemaTypes.Boolean,
        default: false
    },
    id: {
        type: SchemaTypes.String,
        unique: true
    }
}, {timestamps: true});

export const TodoModel = mongoose.model("todo", TodoSchema);
