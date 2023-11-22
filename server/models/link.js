import { Schema, model } from "mongoose";

const linkSchema = new Schema({
    url:{
        type: String,
        requried: true,
    },
    slug:{
        type: String,
        requried: true,
        unique: true,
    },
    clicks:{
        type: Number,
        requried: true,
        default: 0,
    },

},{
    timestamps: true,
});

const Link = model('Link', linkSchema);

export default Link;