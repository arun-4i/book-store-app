import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GetBook from "./pages/book/GetBook";
import DeleteBook from "./pages/book/DeleteBook";
import GetMovieById from "./pages/movie/GetMovieById";
import DeleteMovie from "./pages/movie/DeleteMovie";
import BookForm from "./pages/book/BookForm";
import MovieForm from "./pages/movie/MovieForm";
import Navbar from "./components/Navbar";
import BooksPage from "./pages/book/BooksPage";
import MoviesPage from "./pages/movie/MoviesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/books" element={<BooksPage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/books/create" element={<BookForm />} />
          <Route path="/books/update/:id" element={<BookForm />} />
          <Route path="/books/details/:id" element={<GetBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
    </QueryClientProvider>
  );
};

export default App;
