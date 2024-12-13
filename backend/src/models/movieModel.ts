import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releasedYear: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("movie", movieSchema);
