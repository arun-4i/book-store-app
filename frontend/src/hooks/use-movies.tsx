import { MovieFormValues } from "@/pages/movie/MovieForm";
import { createMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "@/services/movie-sevices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function useGetAllMovies() {
    return useQuery({ queryKey: ["movies"], queryFn: getAllMovies });
}

export function useGetMovie({ id }: { id?: string }) {
    return useQuery({
      queryKey: ["movies", id],
      queryFn: () => getMovie({ id }),
      enabled: !!id,
    });
}
 
export function useDeleteMovie({ id }: { id: string }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteMovie({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
        },
        onError: (error) => {
            console.log("error", error.message);
        }
    })
}

export function useCreateMovie({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newMovie: MovieFormValues) => createMovie(newMovie),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
         enqueueSnackbar("Movie created successfully", {
           variant: "success",
         });
        onClose();
      },
      
      onError: (error) => {
          enqueueSnackbar(`Failed to update movie: ${error.message}`, {
            variant: "error",
          });
      console.error("Failed to create movie", error);
    },
  });
}

export function useUpdateMovie({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedMovie: MovieFormValues) => updateMovie(updatedMovie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      enqueueSnackbar("Movie updated successfully", {
        variant: "success",
      });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(`Failed to update movie: ${error.message}`, {
        variant: "error",
      });
      console.error("Failed to update movie", error);
    },
  });
}