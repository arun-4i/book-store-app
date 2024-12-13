import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`;
