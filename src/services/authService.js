import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

async function registerUser(data) {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw createError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "user" },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}

async function loginUser(data) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw createError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw createError("Invalid credentials", 401);

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}

async function deleteUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw createError("user not found", 404);

  await prisma.user.delete({ where: { id } });

  return true;
}

export const authService = {
  registerUser,
  loginUser,
  deleteUserById,
};