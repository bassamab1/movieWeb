import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

export default router;