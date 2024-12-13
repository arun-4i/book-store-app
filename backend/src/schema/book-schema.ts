import { z } from "zod";

  export const bookData = z.object({
    id: z.number().optional(),
    title: z
      .string()
      .min(1, "Title is required")
      .max(50, "Title must be 50 characters or less"),
    author: z
      .string()
      .min(1, "Author is required")
      .max(50, "Author must be 50 characters or less"),
    publishedYear: z.string(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
    createdAt: z.string().date().optional(),
    updatedAt: z.string().date().optional(),
    authorID: z.number().optional(),
  });

  export const authorData = z.object({
    id: z.number().optional(),
    name: z.string(),
    dob: z.string(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
    createdAt: z.string().date().optional(),
    updatedAt: z.string().date().optional(),
  });

export const incomingData = z.object({
  bookId: z.number().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(50, "Author must be 50 characters or less"),
  publishedYear: z.string(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
  authorID: z.number().optional(),
  dob: z.string(),
});


export const BookDataArray = z.array(bookData);
export type Book = z.infer<typeof bookData>;
export type IncomingData = z.infer<typeof incomingData>;