import app from "./app.js";
import { connectRedis } from "./redis.js";

const port = process.env.PORT || 3000;

connectRedis()
  .then(() => console.log("Redis ready"))
  .catch((err) => console.log("Redis failed:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});