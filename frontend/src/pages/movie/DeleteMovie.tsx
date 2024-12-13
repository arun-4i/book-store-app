import { useSnackbar } from "notistack";
import { useDeleteMovie } from "@/hooks/use-movies";

interface MovieFormProps {
  id: string | null;
  onClose: () => boolean;
}

const DeleteMovie: React.FC<MovieFormProps> = ({ id, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: handleDeleteMovie,
    isError,
    isSuccess,
  } = useDeleteMovie({ id: id ?? "" });

  if (isError) {
    enqueueSnackbar("Failed to fetch data", { variant: "error" });
  }

  if (isSuccess) {
    enqueueSnackbar("Movie deleted successfully", { variant: "success" });
    onClose();
  }

  const onDeleteClick = () => {
    if (id) {
      handleDeleteMovie();
    } else {
      enqueueSnackbar("Cannot delete movie without an ID", {
        variant: "error",
      });
    }
     
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[600px] relative">
        <button className="absolute right-2 top-2 text-3xl" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-col items-center rounded-xl">
          <h3 className="text-2xl">
            Are you sure you want to delete this book?
          </h3>
          <button
            className="p-4 mt-4 bg-red-600 text-white w-full"
            onClick={onDeleteClick}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovie;
