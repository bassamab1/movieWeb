import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { createError } from "../utils/createError.js";
import { authService } from "../services/authService.js";

export const register = async (req, res, next) => {
 
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return next(createError("Validation error", 400));
    }

    const { user, token } = await authService.registerUser(result.data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set true in production (HTTPS)
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "User registered",
      user,
    });
  } 

export const login = async (req, res, next) => {

    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return next(createError("Validation error", 400));
    }

    const { user, token } = await authService.loginUser(result.data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in",
      user,
    });
  }

export const deleteUser = async (req, res, next) => {

    await authService.deleteUserById(req.params.id);

    res.json({ message: "User deleted" });
  }