import { api } from "@/api/axios";
import { BookFormValues } from "@/pages/book/BookForm";
import { Book } from "@/types/types";

export const getAllBooks = async () => {
  const { data } = await api.get("/books");
  console.log("getAllBooks", data.data);
  return data.data as Book[];
};

export const getBook = async ({ id }: { id?: string }) => {
  const { data } = await api.get(`/books/${id}`);
  console.log("getBook", data);
  return data as Book;
};

export const deleteBook = async ({ id }: { id: string }) => {
  const { data } = await api.delete(`/books/${id}`);
  return data as Book;
};

export const createBook = async (newBook: BookFormValues) => {
  const { data } = await api.post("/books", newBook);
  return data as Book;
};

export const updateBook = async (updatedBook: BookFormValues) => {
  const { data } = await api.put(`/books/${updatedBook._id!}`, updatedBook);
  return data as Book;
};
