import { Router } from "express";
import { END_POINTS } from "./constants/end-points";
import { booksRouter } from "./routes/booksRoute";
// import { moviesRouter } from "./routes/moviesRoute";

export const router = Router();

router.use(END_POINTS.BOOKS, booksRouter);
// router.use(END_POINTS.MOVIES, moviesRouter);