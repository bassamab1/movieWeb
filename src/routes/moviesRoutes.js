import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
} from "../controllers/moviesControllers.js";

const router = express.Router();

router.get("/movies", getMovies);
router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);

export default router;