import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const SECRET_KEY = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({
            error: "An error occurred while creating the user",
            details: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({
            message: "User logged in successfully.",
            token
        });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({
            error: "An error logging in the user",
        });
    }
};

export const getUserAll = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error getting all users:", error.message);
        return res.status(500).json({
            error: "An error occurred while getting all users"
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user by id:", error.message);
        return res.status(500).json({
            error: "An error occurred while getting user by id"
        });
    }
}
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error.message);
        return res.status(500).json({
            error: "An error updating user"
        });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({
            error: "An error deleting user"
        });
    }
}