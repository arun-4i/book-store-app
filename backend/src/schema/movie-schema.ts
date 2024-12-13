import { z } from "zod";

export const movieSchema = z.object({
  _id: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  director: z.string().nonempty("Director is required"),
  releasedYear: z
    .number()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  language: z.string().nonempty("Language is required"),
});
