import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path"; // Import the path module
import { fileURLToPath } from 'url';
// Load environment variables from the .env file
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../routes/.env");

// Load environment variables from the specified .env file
dotenv.config({ path: envPath })
const mongo = process.env.MONGO_URI;

const connectDB = () => {
    (mongoose.connect(mongo)).then(() =>{
        console.log('database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB