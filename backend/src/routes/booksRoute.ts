import { Router } from "express";
import bookController from "../controllers/book-controller.js";

export const booksRouter = Router();

booksRouter.get("/", bookController.getBooks)

booksRouter.get("/:id", bookController.getBookById)

booksRouter.post("/", bookController.createOne);

booksRouter.put("/:id", bookController.updateOne);

booksRouter.delete("/:id", bookController.deleteOne);

