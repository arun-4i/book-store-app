import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { enqueueSnackbar } from "notistack";
import { useGetBook } from "@/hooks/use-books";


const GetBook = () => {
  // const [book, setBook] = useState<Book | null>(null);
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // useEffect(() => {
  //   setLoading(true);
  //   console.log("Requesting book details with ID:", id);
  //   axios
  //     .get(`http://localhost:5555/books/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setBook(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, [id]);

  const { data: book, isLoading, isError } = useGetBook({ id: id! });

  if (isLoading) {
    console.log(id, typeof id);
  }

  if (isError) {
    enqueueSnackbar("Failed to fetch book data", { variant: "error" });
  }


  return (
    <div className="p-4">
      <BackButton destination="/books" />
      <h1 className="text-3xl my-4">Book Details</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book?._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book?.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book?.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Published Year</span>
            <span>{book?.publishedYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{book?.createdAt.toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Updated At</span>
            <span>{book?.updatedAt.toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetBook;
