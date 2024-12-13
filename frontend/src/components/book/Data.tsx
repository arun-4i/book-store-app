import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Book } from "../../types/types";

interface DataTableProps {
  data: Book[];
  columns: ColumnDef<Book>[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

const Data: React.FC<DataTableProps> = ({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
}) => {
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => {
              const isSorted = header.column.getIsSorted();
              let sortIndicator = null;

              if (isSorted) {
                if (isSorted === "asc") {
                  sortIndicator = " 🔼";
                } else if (isSorted === "desc") {
                  sortIndicator = " 🔽";
                }
              }

              return (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {sortIndicator}
                </TableHead>
              );
            })
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No books available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Data;
