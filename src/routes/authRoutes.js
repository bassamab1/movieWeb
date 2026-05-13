import express from "express";
import { register, login, deleteUser } from "../controllers/authControllers.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", apiLimiter, login);
router.delete("/user/:id", deleteUser);

export default router;