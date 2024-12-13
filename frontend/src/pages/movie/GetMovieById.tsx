import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader";
import { useGetMovie } from "@/hooks/use-movies";
import { useEffect } from "react";

interface MovieFormProps {
  id: string | null;
  onClose: () => void;
}

const GetMovieById: React.FC<MovieFormProps> = ({ id, onClose }) => {
  const { data: movie, isLoading, isError } = useGetMovie({ id: id! });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Failed to fetch movie data", { variant: "error" });
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[600px] relative">
        <h1 className="p-2 text-2xl">Movie Details</h1>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>

        <div className="flex flex-col w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{movie?._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{movie?.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{movie?.director}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Published Year</span>
            <span>{movie?.releasedYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Language</span>
            <span>{movie?.language}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{movie?.createdAt?.toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Updated At</span>
            <span>{movie?.updatedAt?.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMovieById;
