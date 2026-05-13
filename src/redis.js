import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.log("Redis Error", err);
});

export async function connectRedis() {
  if (!process.env.REDIS_URL) {
    console.log("REDIS disabled");
    return;
  }

  await redisClient.connect();
  console.log("Redis connected");
}