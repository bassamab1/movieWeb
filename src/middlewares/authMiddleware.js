import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. find user in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role:true
      },
    });

  
   

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. attach user to request
    req.user = user;
     console.log(req.user.role)
    // 5. go to next middleware / route
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};