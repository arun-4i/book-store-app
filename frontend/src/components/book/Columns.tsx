import { ColumnDef } from "@tanstack/react-table";
import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Columns = (): ColumnDef<Book>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "publishedYear",
    header: "Publish Year",
  },
  {
    header: "Operations",
    cell: ({ row }) => (
      <div className="flex justify-between">
        <Link to={`/books/details/${row.original._id}`}>
          <FaRegEye className="text-blue-600 text-2xl" />
        </Link>
        <Link to={`/books/update/${row.original._id}`}>
          <FaPencilAlt className="text-green-600 text-2xl" />
        </Link>
        <Link to={`/books/delete/${row.original._id}`}>
          <MdDelete className="text-red-600 text-2xl" />
        </Link>
      </div>
    ),
  },
];

export default Columns;
