import mongoose from "mongoose";
import postMessageModel from "../models/postMessage.js";

/*CRUD functions*/
export const getPosts = async (req, res) => {
    try {
        const postMessage = await postMessageModel.find();
        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).send({ Message: error.message })
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new postMessageModel(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).send({ Message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id to be updated.');

    const updatedPost = await postMessageModel.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id to be deleted.');

    await postMessageModel.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id to be updated.');

    const post = await postMessageModel.findById(id);
    const updatedPost = await postMessageModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}