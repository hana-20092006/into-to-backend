// we can write post controller code in user controller , it won't crash but for readability we do this

import { Post } from '../models/post.model.js';
// CRUD

// Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age} = req.body;
        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const post = await Post.create({ name, description, age});
        res.status(201).json({
            message: "Post created successfully", post
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",error
        });
    }
}

// Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
        } catch (error) {
        res.status(500).json({
            message: "Internal server error",error
        });
    }
}
// update post
const updatePost = async (req,res) => {
    try {
        // basic validation to check if the body is empty
        // {name: x, description: y, age: z} -> [name, description, age] that is array of keys and if this field length = 0, means given body is empty 
        // {} = truthy values, is not reliable 
        //Object.keys(req.body) -> gives array of keys present in the object
        if (Object.keys(req.body).length===0) {
            return res.status(400).json({
                message: "No data is provided for update"
            });
        }
        // id of the post be taken from req.params
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            {new: true}
        );
        if (!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({ 
            message: "Post updated successfully", post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",error
        });
    }
}
// delete a post
const deletePost = async (req,res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            // 404 = means post not found
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {   
        res.status(500).json({
            message: "Internal server error",error
        });
    }
}
export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};