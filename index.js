import dotenv from "dotenv";
import express from "express";
import path from "path"; // Import the path module
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import connectDB from "./config/database.js"; // Import connectDB as a default import
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cookieParser  from "cookie-parser";
import cors from "cors"
// Get the directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../routes/.env");

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 8080; // Use PORT from environment variable or fallback to 8081
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption));

app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)




app.listen(PORT, async () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
