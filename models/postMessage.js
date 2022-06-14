import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    owner: String,
    tags: [String],
    imagePath: String,
    likeCount: {
        type: Number,
        default: 0
    },
    postDate: {
        type: Date,
        default: new Date()
    },
});

const postMessageModel = mongoose.model('postMessageModel', postSchema);

export default postMessageModel;