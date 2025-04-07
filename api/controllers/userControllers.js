import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import User from "../models/user.js";

const userControllers = express.Router();

userControllers.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({ message: "user registered" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

userControllers.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ error: "user not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // jwt
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "300h",
        })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: "error message", err })
    }
})

export default userControllers