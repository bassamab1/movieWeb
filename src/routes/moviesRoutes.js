import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
} from "../controllers/moviesControllers.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/movies",rateLimit ,authMiddleware, getMovies);
router.post("/movies",authMiddleware,adminMiddleware, createMovie);
router.delete("/movies/:id",authMiddleware,adminMiddleware, deleteMovie);
export default router;