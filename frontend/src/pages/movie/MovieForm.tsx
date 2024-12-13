import { useSnackbar } from "notistack";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateMovie,
  useGetMovie,
  useUpdateMovie,
} from "@/hooks/use-movies";
import { useEffect } from "react";

const currentYear = new Date().getFullYear();

const movieSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title length must be > 3"),
  director: z.string().min(3, "Director name must be > 3"),
  releasedYear: z
    .number()
    .int("Released Year must be an integer")
    .gte(1900, "Released Year must be a valid year after 1900")
    .lte(currentYear, `Released Year must not exceed ${currentYear}`)
    .refine(  
      (year) => year.toString().length === 4,
      "Released Year must be a four-digit number"
    ),
  language: z.string().min(3, "Language name must be > 3"),
});

export type MovieFormValues = z.infer<typeof movieSchema>;

interface MovieFormProps {
  id: string | null;
  onClose: () => void; 
}

const MovieForm: React.FC<MovieFormProps> = ({ id, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
  });

  const createMovie = useCreateMovie({ onClose: onClose });
  const updateMovie = useUpdateMovie({ onClose: onClose });

  const { data: MovieData, isSuccess, isError } = useGetMovie({ id:id! });

  useEffect(() => {
    if (isSuccess && MovieData) {
      // Reset form with the fetched movie data
      reset({
        _id: MovieData._id,
        title: MovieData.title,
        director: MovieData.director,
        releasedYear: MovieData.releasedYear,
        language: MovieData.language,
      });
    }
    if (isError) {
      enqueueSnackbar("Failed to load movie data", { variant: "error" });
    }
  }, [enqueueSnackbar,isSuccess, MovieData, reset, isError]);

  const onSubmit = (data: MovieFormValues) => {
    if (id) {
      updateMovie.mutate({ ...data, _id: id });
    } else {
      createMovie.mutate(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[600px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <h1 className="text-2xl p-2">{id ? "Edit Movie" : "Create Movie"}</h1>
        <form
          className="flex flex-col rounded-xl p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="my-4">
            <label htmlFor="title" className="text-xl mr-4 text-gray-500">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="my-4">
            <label htmlFor="director" className="text-xl mr-4 text-gray-500">
              Director
            </label>
            <input
              type="text"
              id="director"
              {...register("director")}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl"
            />
            {errors.director && (
              <span className="text-red-500">{errors.director.message}</span>
            )}
          </div>
          <div className="my-4">
            <label
              htmlFor="releasedYear"
              className="text-xl mr-4 text-gray-500"
            >
              Released Year
            </label>
            <input
              type="number"
              id="releasedYear"
              {...register("releasedYear", { valueAsNumber: true })}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl"
            />
            {errors.releasedYear && (
              <span className="text-red-500">
                {errors.releasedYear.message}
              </span>
            )}
          </div>
          <div className="my-4">
            <label htmlFor="language" className="text-xl mr-4 text-gray-500">
              Language
            </label>
            <input
              type="text"
              id="language"
              {...register("language")}
              className="border-2 border-gray-500 px-4 py-2 w-full rounded-xl"
            />
            {errors.language && (
              <span className="text-red-500">{errors.language.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {id ? "Update Movie" : "Create Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
