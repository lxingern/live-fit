const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post