// doing CRUD APIs
import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true // cut all the whitespaces 
        },

        description: {
            type: String,
            required: true,
            trim: true
        },
        
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 150
        }
    },
    {
        timestamps: true
    }
    )
export const Post = mongoose.model('Post', postSchema);