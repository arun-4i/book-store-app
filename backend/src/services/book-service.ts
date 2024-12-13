import {type Book, IncomingData } from "../schema/book-schema";
import bookData from "../data/book-data";

const getBooks = async () => {
  return await bookData.getMany();
};

const getBookById = async (id: string) => {
  return await bookData.getOne(id);
};

const deleteOne = async (id: string) => {
  return await bookData.deleteOne(id);
};

const createOne = async (data: IncomingData) => { 
  const result = await bookData.createBookAndAuthor(data);
  return result
};

const updateOne = async (id: string, data: IncomingData) => {
  const result = await bookData.updateOne(id, data);
};

export default {
  getBooks,
  getBookById,
  deleteOne,
  createOne,
  updateOne,
};
