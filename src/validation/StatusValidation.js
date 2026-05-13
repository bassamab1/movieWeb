import { z } from "zod";

export const statusSchema = z.object({
  status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"]),
});