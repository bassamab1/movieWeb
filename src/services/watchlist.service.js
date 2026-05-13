import { prisma } from "../prisma.js";
import { createError } from "../utils/createError.js";

export const getWatchlistService = async (userId) => {
  return prisma.watchlistItem.findMany({
    where: { userId },
    include: { movie: true },
  });
};

export const addWatchlistService = async (userId, movieId) => {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw createError("Movie not found", 404);
  }

  return prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: "PLANNED",
    },
  });
};

export const updateWatchStatusService = async (id, status, userId) => {
  const item = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!item) {
    throw createError("Watchlist item not found", 404);
  }

  if (item.userId !== userId) {
    throw createError("Not allowed", 403);
  }

  return prisma.watchlistItem.update({
    where: { id },
    data: { status },
  });
};

export const removeWatchlistService = async (id, userId) => {
  const item = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!item) {
    throw createError("Watchlist item not found", 404);
  }

  if (item.userId !== userId) {
    throw createError("Not allowed", 403);
  }

  await prisma.watchlistItem.delete({
    where: { id },
  });

  return true;
};