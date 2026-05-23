import express from "express";
import cors from "cors";
import Authrouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import userRoutes from "./routes/userRoutes.js";
import watchlistRouter from "./routes/watchlistRoutes.js"
import moviesRoute from "./routes/moviesRoutes.js"
import errorHandler from "./middlewares/errorMiddleware.js"
import { authMiddleware } from "./middlewares/authMiddleware.js";
const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(logger)
app.use("/auth",Authrouter)
app.use("/user", userRoutes);
app.use("/",watchlistRouter)
app.use("/api",moviesRoute)
app.get("/", (req, res) => {
  res.json({ message: "app is running" });
});
app.use(errorHandler)


export default app;