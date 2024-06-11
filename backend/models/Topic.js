const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    brief: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, 
    {timestamps: true},
)

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic