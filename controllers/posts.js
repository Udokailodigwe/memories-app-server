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