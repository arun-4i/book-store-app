import express, { Router } from "express";
import { z } from "zod";
import { Movie } from "../models/movieModel.js";
import { movieSchema, validate, } from "../middleware/validationMiddleWare.js";

// const router = express.Router();

// // Create a new movie
// router.post("/", validate(movieSchema), async (req, res) => {
//   try {
//     // Validate request body against the Zod schema
//     const validatedMovie = movieSchema.parse(req.body);

//     const movie = await Movie.create(validatedMovie);
//     return res.status(201).send(movie);
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       // Zod validation error
//       return res.status(400).send({ message: err.errors });
//     }
//     console.log(err);
//     return res.status(400).send({ message: err.message });
//   }
// });

// // Get all movies
// router.get("/", async (req, res) => {
//   try {
//     const movies = await Movie.find({});
//     return res.status(200).json({
//       count: movies.length,
//       data: movies,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Get a single movie by id
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const movie = await Movie.findById(id);
//     if (!movie) {
//       return res.status(404).send({ message: "Movie not found" });
//     }
//     return res.status(200).json(movie);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Update a movie
// router.put("/:id",validate(movieSchema), async (req, res) => {
//   try {
//     // Validate request body against the Zod schema
//     const validatedMovie = movieSchema.parse(req.body);

//     const { id } = req.params;
//     const result = await Movie.findByIdAndUpdate(id, validatedMovie, {
//       new: true,
//     });

//     if (!result) {
//       return res.status(404).send({ message: "Movie not found" });
//     }
//     return res
//       .status(200)
//       .send({ message: "Movie updated successfully", data: result });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       // Zod validation error
//       return res.status(400).send({ message: error.errors });
//     }
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Delete a movie
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Movie.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).send({ message: "Movie not found" });
//     }

//     return res.status(200).send({ message: "Movie deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });


export const moviesRouter = Router();

moviesRouter.get("/",);

moviesRouter.get("/:id",);

moviesRouter.post("/",);

moviesRouter.put("/:id",);

moviesRouter.delete("/:id");


export default router;
