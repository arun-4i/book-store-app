import { z } from "zod";

// Define the schema for your environment variables
const envSchema = z.object({
  VITE_BASE_URL: z.string().min(1),
});

// Access environment variables using import.meta.env
const env = import.meta.env;

// Parse the environment variables
export const parsedenv = envSchema.parse({
  VITE_BASE_URL: env.VITE_BASE_URL,
});
