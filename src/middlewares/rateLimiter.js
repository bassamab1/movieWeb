// middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // max 100 requests per IP
  message: {
    error: "Too many requests, please try again later.",
  },
});