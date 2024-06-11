const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Todo = require('../models/Todo')
const Topic = require('../models/Topic')

const register = async (req, res) => {
    const { name, phone, email, password, age } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }
        if (!password || !password.trim()) {
            return res.status(400).json({ msg: "Password is required" })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSalt(saltRounds);
        const hashedPassword = bcrypt.hash(password, salt);

        user = new User({
            name,
            phone,
            email,
            password,
            age,
        });
        await user.save();

        const payload = {
            user: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000
        })

        res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

        const { password: pass, ...rest } = user._doc;

        res.status(201).json({ msg: "User Registered Successfully", user: rest });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ msg: "Invalid Credetials" });
        }
        const payload = {
            user: user._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 360000,
        });

        res.cookie("token", token, { httpOnly: true, expiresIn: 360000 });

        const { password: pass, ...rest } = user._doc;

        res.status(200).json({ msg: "User Logged In Successfully", user: rest });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ msg: "User logged out successfully" })
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const { password: pass, ...rest } = user._doc;
        return res.status(200).json({ msg: "User Found", user: rest });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

const updateDetails = async (req, res) => {
    const { name, phone, email, age } = req.body;
    try {
        let user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        let exists = await User.findOne({ email });
        if (exists && exists._id.toString() != user._id.toString()) {
            return res.status(404).json({ msg: "Email already exists" });
        }

        user.name = name
        user.phone = phone
        user.email = email
        user.age = age

        await user.save();

        const { password: pass, ...rest } = user._doc
        return res.status(200).json({ msg: "User details updated successfully", user: rest });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

const updatePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    try {
        let user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const salt = bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save()
        const { password: pass, ...rest } = user._doc
        return res.status(200).json({ msg: "User Password Updated Successfully", user: rest });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const topics = await Topic.find({ user: req.body });
        if (topics.length > 0) {
            await Topic.deleteMany({ user: req.body })
        }

        const todos = await Todo.find({ user: req.body });
        if (todos.length > 0) {
            await Todo.deleteMany({ user: req.body })
        }

        await User.deleteOne({ _id: req.user })
        res.clearCookie("token");
        res.status(200).json({ msg: "User deleted successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server Error" });
    }
}

module.exports = { register, login, logout, getMe, updateDetails, updatePassword, deleteUser }