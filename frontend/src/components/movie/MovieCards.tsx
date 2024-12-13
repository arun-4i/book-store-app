import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import { BiCameraMovie, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Movie } from "../../types/types";
import { useSnackbar } from "notistack";
import MovieForm from "../../pages/movie/MovieForm";
import DeleteMovie from "../../pages/movie/DeleteMovie";
import GetMovieById from "../../pages/movie/GetMovieById";
import { IoLanguageOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useGetAllMovies } from "@/hooks/use-movies";
import { useQueryClient } from "@tanstack/react-query";

const MoviesCards = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<string | null>(null);  
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data: movies, isLoading, isError } = useGetAllMovies();

  if (isError) {
    enqueueSnackbar("Failed to fetch movies data", { variant: "error" });
  }

  const handleCreateClick = () => {
    setSelectedMovieId(null);
    setShowModal("create");
  };

  const handleEditClick = (id: string) => {
    setSelectedMovieId(id);
    setShowModal("edit");
  };

  const handleDeleteClick = (id: string) => {
    setSelectedMovieId(id);
    setShowModal("delete");
  };

  const handleGetMovieById = (id: string) => {
    setSelectedMovieId(id);
    setShowModal("details");
  };

  const handleCloseModal = () => {
    setShowModal(null);
    queryClient.invalidateQueries({ queryKey: ["movies"] });
  };

 return (
   <div>
     {isLoading ? (
       <Loader />
     ) : (
       <div className="p-4">
         <div className="flex justify-between items-center">
           <h1 className="text-3xl">Movies List</h1>
           <Button onClick={handleCreateClick} variant="outline">
             Add Movie
           </Button>
         </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {/* {movies && Array.isArray(movies) && movies.length > 0 && movies.map((movie) => ())} */}
           {movies && Array.isArray(movies) && movies.length > 0 && movies.map((movie) => (
             <div
               key={movie._id}
               className="border-2 border-gray-500 rounded-xl px-4 py-2 m-4 relative hover:shadow-xl"
             >
               <h2 className="absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-xl">
                 {movie.releasedYear}
               </h2>
               <div className="flex justify-start items-center gap-x-2">
                 <BiCameraMovie className="text-red-300 text-2xl" />
                 <h2 className="my-1">{movie.title}</h2>
               </div>
               <div className="flex justify-start items-center gap-x-2">
                 <BiUserCircle className="text-red-300 text-2xl" />
                 <h2 className="my-1">{movie.director}</h2>
               </div>
               <div className="flex justify-start items-center gap-x-2">
                 <IoLanguageOutline className="text-red-300 text-2xl" />
                 <h2 className="my-1">{movie.language}</h2>
               </div>
               <div className="flex justify-between items-center gap-x-2 mt-2 p-2">
                 <button onClick={() => handleGetMovieById(movie._id)}>
                   <BsInfoCircle className="text-2xl text-blue-600 hover:text-black" />
                 </button>
                 <button onClick={() => handleEditClick(movie._id)}>
                   <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                 </button>
                 <button onClick={() => handleDeleteClick(movie._id)}>
                   <MdOutlineDelete className="text-2xl text-red-800 hover:text-black" />
                 </button>
               </div>
             </div>
           ))}
         </div>

         {showModal === "create" && (
           <MovieForm id={null} onClose={handleCloseModal} />
         )}
         {showModal === "edit" && (
           <MovieForm id={selectedMovieId} onClose={handleCloseModal} />
         )}
         {showModal === "delete" && (
           <DeleteMovie id={selectedMovieId} onClose={handleCloseModal} />
         )}
         {showModal === "details" && (
           <GetMovieById id={selectedMovieId} onClose={handleCloseModal} />
         )}
       </div>
     )}
   </div>
 );

};

export default MoviesCards;
