import { movieSchema } from "../validation/movieValidation.js";
import { createError } from "../utils/createError.js";
import * as movieService from "../services/movie.service.js";

export const createMovie = async (req, res, next) => {
  const result = movieSchema.safeParse(req.body);

  if (!result.success) {
    return next(createError("Validation error", 400));
  }

  const movie = await movieService.createMovieService(result.data);

  res.status(201).json(movie);
};

export const getMovies = async (req, res, next) => {
  
  const movies = await movieService.getMoviesService();

  res.json({ message: "Movies", movies });
};

export const deleteMovie = async (req, res, next) => {
  await movieService.deleteMovieService(req.params.id);

  res.json({ message: "Movie deleted" });
};