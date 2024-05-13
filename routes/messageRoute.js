import express from "express";
import isAuthenticated from "../middleware/isauthenticated.js";
import { getMessage, sendMessage } from "../controllers/messagecontroller.js";
const router = express.Router();
router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated,getMessage)
export default router;