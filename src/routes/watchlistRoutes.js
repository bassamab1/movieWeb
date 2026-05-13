import express from "express";
import {
  GetWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchStatus,
} from "../controllers/watchlistControllers.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/watchlist", authMiddleware, GetWatchlist);
router.post("/watchlist", authMiddleware, addToWatchlist);
router.patch("/watchlist/:id", authMiddleware, updateWatchStatus);
router.delete("/watchlist/:id", authMiddleware, removeFromWatchlist);

export default router;