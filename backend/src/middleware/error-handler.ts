import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import mongoose from 'mongoose'

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorReport = {};
  
  if (error instanceof z.ZodError) {
    errorReport = {
      error: "zod error",
      ...error.issues[0],
    };
      } else if (error instanceof mongoose.Error) {
        errorReport = {
          error: 'mongoose error',
          message: error.message,
        }
  } else if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    "name" in error &&
    error.name == "MongoServerError"
  ) {
    errorReport = {
      error: "mongo server error",
      message: error.message,
    };
  } else if (error instanceof Error) {
    errorReport = {
      error: "js error",
      message: error.message,
    };
  } else if (error && typeof error === "object" && "message" in error) {
    errorReport = {
      error: "custom error",
      message: String(error.message),
    };
  } else if (typeof error === "string") {
    errorReport = {
      error: "custom error",
      message: error,
    };
  } else {
    errorReport = {
      error: "unhandled error",
      message: "something went wrong",
    };
  }

  console.log(errorReport);

  return res.status(500).json(errorReport);
};
