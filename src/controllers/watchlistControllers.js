import { watchlistSchema } from "../validation/watchListValidation.js";
import { statusSchema } from "../validation/StatusValidation.js";
import { createError } from "../utils/createError.js";
import * as watchService from "../services/watchlist.service.js";

export const GetWatchlist = async (req, res, next) => {
  const watchlist = await watchService.getWatchlistService(req.user.id);

  res.status(200).json({ watchlist });
};

export const addToWatchlist = async (req, res, next) => {
  const result = watchlistSchema.safeParse(req.body);

  if (!result.success) {
    return next(createError("Validation error", 400));
  }

  const item = await watchService.addWatchlistService(
    req.user.id,
    result.data.movieId
  );

  res.status(201).json(item);
};

export const updateWatchStatus = async (req, res, next) => {
  const result = statusSchema.safeParse(req.body);

  if (!result.success) {
    return next(createError("Invalid status", 400));
  }

  const updated = await watchService.updateWatchStatusService(
    req.params.id,
    result.data.status,
    req.user.id
  );

  res.status(200).json(updated);
};

export const removeFromWatchlist = async (req, res, next) => {
  await watchService.removeWatchlistService(req.params.id, req.user.id);

  res.status(200).json({ message: "Removed from watchlist" });
};