import { api } from "@/api/axios";
import { MovieFormValues } from "@/pages/movie/MovieForm";
import { Movie } from "@/types/types";

export const getAllMovies = async () => {
  const { data } = await api.get("/movies");
  console.log("getAllMovies", data.data);
  return data.data as Movie[];
};


export const getMovie = async ({id}:{id?:string}) => {
    const { data } = await api.get(`/movies/${id}`);  
    console.log("getMovie", data);
    return data as Movie;
};

export const deleteMovie = async({id}:{id?:string}) => {
    const { data } = await api.delete(`/movies/${id}`);
    return data as Movie;
}

export const createMovie = async (newMovie: MovieFormValues) => {
    console.log(newMovie);
    const { data } = await api.post("/movies", newMovie);
    return data as Movie;
}

export const updateMovie = async (updatedMovie: MovieFormValues) => {
    console.log(updatedMovie);
    const { data } = await api.put(`/movies/${updatedMovie._id}`, updatedMovie);
    return data as Movie;
}