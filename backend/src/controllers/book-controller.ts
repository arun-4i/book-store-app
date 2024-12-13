import { NextFunction, Request, Response } from "express";
import bookService from "../services/book-service";
import { incomingData } from "../schema/book-schema";

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await bookService.getBooks();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const data = await bookService.getBookById(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const data = await bookService.deleteOne(id);
    res.json({data});
  } catch (error) {
    next(error);
  }
};


const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = incomingData.parse(req.body);
    const result = await bookService.createOne(parsedData);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const parsedData = incomingData.parse(data);
    const result = await bookService.updateOne(id, parsedData);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


export default {
  getBooks,
  getBookById,
  createOne,
  updateOne,
  deleteOne,
};
