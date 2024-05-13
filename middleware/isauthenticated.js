import path from "path"; // Import the path module
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// Get the directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, "../routes/.env");

// Load environment variables from the specified .env file
dotenv.config({ path: envPath });
const isAuthenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json({message:"User not authenticated"})
        };
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decode);
        if(!decode)
            {
                return res.status(401).json({message:"Invalid token"});
            };
        
        req.id = decode.userId;
        next();
    }catch (error){
        console.log(error);
    }
};
export default isAuthenticated;
const req = {
    id :"",
}
req.id = "sdlbgnjdfn"