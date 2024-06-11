const Todo = require("../models/Todo");

const getTopics = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user });
        res.status(200).json({ msg: "Todos Found", todos });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
};

const getTopic = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            res.status(404).json({ msg: "Todo Not Found" });
        } else if (todo.user.toString() !== req.user) {
            res.status(401).json({ msg: "You Are Not Authorized" });
        } else {
            res.status(200).json({ msg: "Todo Found", todo });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
};

const createTopic = async (req, res) => {
    const { topic, title, description } = req.body;
    try {
        const todo = await Todo.create({
            topic,
            title,
            description,
            completed: false,
            user: req.user,
        });
        res.status(201).json({ msg: "Todo Created Successfully", todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
};

const updateTopic = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo Not Found" });
        }
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not Authorized" });
        }
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        await todo.save();
        res.status(200).json({ msg: "Todo Updated Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo Not Found" });
        }
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not Authorized" });
        }
        await Todo.deleteOne({ _id: id });
        res.status(200).json({ msg: "Todo Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
};

module.exports = { getTopics, getTopic, createTopic, updateTopic, deleteTopic };