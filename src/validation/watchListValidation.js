import { z } from "zod";

export const watchlistSchema = z.object({
  movieId: z.string().min(1, "movieId required"),
});