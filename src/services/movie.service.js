import { prisma } from "../prisma.js";
import { createError } from "../utils/createError.js";
import { redis } from "../redis.js";
export const createMovieService = async (data) => {
  const { title, description, releaseYear } = data;

  const movieCheck = await prisma.movie.findFirst({
    where: { title, description, releaseYear },
  });

  if (movieCheck) {
    throw createError("Movie already exists in database", 409);
  }

  const movies= await prisma.movie.create({
    data,
  });
   await redis.del("movies");
   return movies;
};

export const getMoviesService = async () => {
  
  // 1. check cache
  const cachedMovies = await redis.get("movies");

  if (cachedMovies) {
    console.log("From Redis Cache");

    return JSON.parse(cachedMovies);
  }

  // 2. if not in cache -> database
  console.log("From Database");

  const movies = await prisma.movie.findMany();

  // 3. store in redis for 1 hour
  
  await redis.set("movies", JSON.stringify(movies), {
    ex: 3600,
  });

  return movies;
};

export const deleteMovieService = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw createError("Movie not found", 404);
  }

  await prisma.movie.delete({
    where: { id },
  });
   await redis.del("movies");

  return true;
};