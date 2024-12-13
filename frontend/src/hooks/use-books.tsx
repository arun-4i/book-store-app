import { BookFormValues } from "@/pages/book/BookForm";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "@/services/book-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//get all books
export function useGetAllBooks() {
  return useQuery({ queryKey: ["books"], queryFn: getAllBooks });
}

//get single book
export function useGetBook({ id }: { id?: string }) {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getBook({ id }),
    enabled: !!id,
  });
}

//delete book
export function useDeleteBook({ id }: { id: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteBook({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
}

//create book
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBook: BookFormValues) => createBook(newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Failed to create book", error);
    },
  });
};

//update book
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedBook: BookFormValues) => updateBook(updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Failed to update book", error);
    },
  });
};
