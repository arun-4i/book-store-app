import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBook, useGetBook, useUpdateBook } from "@/hooks/use-books";
import BackButton from "../../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

const currentYear = new Date().getFullYear();

const bookSchema = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  author: z
    .string()
    .min(3, { message: "Author must be at least 3 characters long" }),
  publishedYear: z
    .number()
    .int("Released Year must be an integer")
    .gte(1900, "Released Year must be a valid year after 1900")
    .lte(currentYear, `Released Year must not exceed ${currentYear}`)
    .refine(
      (year) => year.toString().length === 4,
      "Released Year must be a four-digit number"
    ),
});

export type BookFormValues = z.infer<typeof bookSchema>;

const BookForm = () => {
  const { id } = useParams(); 

  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });

  // const foo = () => {
  //   return 9;
  // };

  // const myUseForm = <T,>({ res }: { res: () => T }) => {
  //   res();
  // };

  // myUseForm<number>({ res: foo });

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();

  const { data: bookData, isSuccess, isError } = useGetBook({ id });

  useEffect(() => {
    if (isSuccess && bookData) {
      reset(bookData); // Set fetched data into form fields
    }
  }, [isSuccess, bookData, reset]);

  const onSubmit = async (data: BookFormValues) => {
    try {
      if (id) {
        updateBook.mutate({ ...data, _id: id });
      } else {
        createBook.mutate(data);
      }
      navigate("/books");
    } catch (error) {
      enqueueSnackbar(`Failed to save book: ${error}`, { variant: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Failed to load book data", { variant: "error" });
      navigate("/books");
    }
  }, [isError, navigate]);

  return (
    <div className="p-4">
      <BackButton destination="/books" />
      <h1 className="text-3xl my-4">{id ? "Edit Book" : "Create Book"}</h1>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label htmlFor="title" className="text-xl text-gray-500">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="author" className="text-xl text-gray-500">
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author")}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.author && (
            <span className="text-red-500">{errors.author.message}</span>
          )}
        </div>

        <div className="my-4">
          <label htmlFor="publishedYear" className="text-xl text-gray-500">
            Published Year
          </label>
          <input
            type="number"
            id="publishedYear"
            {...register("publishedYear", { valueAsNumber: true })}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.publishedYear && (
            <span className="text-red-500">{errors.publishedYear.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-2 bg-sky-300 m-8"
        >
          {id ? "Update" : "Create"}
        </button>
        {errors.root && (
          <span className="text-red-500">{errors.root.message}</span>
        )}
      </form>
    </div>
  );
};

export default BookForm;
