import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; 
import Loader from "../../components/Loader";
import Columns from "./Columns"; 
import Data from "./Data"; 
import { useGetAllBooks } from "@/hooks/use-books";

const BooksTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: books, isLoading, isError } = useGetAllBooks();

  const handleCreateClick = () => {
    navigate("/books/create");
  };

  if (isError) {
    enqueueSnackbar("Failed to fetch book data", { variant: "error" });
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl">Books List</h1>
            <Button onClick={handleCreateClick} variant="outline">
              Add Book
            </Button>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <Input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search books..."
            />
          </div>

          {/* Data Table */}
          <Data
            data={books ?? []}
            columns={Columns()}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      )}
    </div>
  );
};

export default BooksTable;
