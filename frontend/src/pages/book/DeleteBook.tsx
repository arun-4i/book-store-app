
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { enqueueSnackbar} from "notistack";
import { useDeleteBook } from "@/hooks/use-books";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const{mutate:handleDeleteBook,isError, isSuccess } = useDeleteBook({id:id!})

  if (isError) {
    enqueueSnackbar("Failed to fetch data", { variant: "error" });
  }

  if(isSuccess){
    enqueueSnackbar("Book deleted successfully", { variant: "success" });
    navigate("/books");
  }

  const onDeleteClick = () => {
    if(id){handleDeleteBook(id)}
  }
  return (
    <div className="p-4">
      <BackButton destination="/books"/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={onDeleteClick}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
