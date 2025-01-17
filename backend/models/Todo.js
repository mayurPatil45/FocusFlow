const { default: mongoose, Schema } = require("mongoose");

const TodoSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamps: true }
)

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;