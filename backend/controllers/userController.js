import { response } from "express";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import path from "path"; // Import the path module
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../routes/.env");

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Please confirm your password to ensure it matches the one you entered" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists try unique one" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const malepic = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const femalepic = "https://avatar.iran.liara.run/public/girl?username=${username}";
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? malepic : femalepic,
            gender
        });
        return res.status(201).json({
            message: "Account created Successfully.",
            success: true

        })

    } catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ username }); // Change `user` to `User`
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false }); // Add error handling
    }
}
export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherusers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherusers);
    } catch (error) {
        console.log(error);
    }
}
