import express from "express";
import "dotenv/config";
import { router } from "./router";
import { env } from "./env";
import morgan from "morgan";
import type { Server } from "http";
import { errorHandler } from "./middleware/error-handler";
import { closeConnectionPool, createConnectionPool } from "./config/db-config";

let httpServer: Server;

const initializeExpressServer = () =>
  new Promise<void>((resolve, reject) => {
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(router);
    app.use((req, res) => res.status(404).send("404: Page Not Found"));
    app.use(errorHandler);

    const PORT = env.PORT;

    httpServer = app
      .listen(PORT, () => {
        console.log(`⚡ app listening on http://localhost:${PORT}`);
        resolve();
      })
      .on("error", reject);
  });

const startup = async () => {
  console.log(`Starting application`);
  try {
    console.log("Initializing database module");
    await initializeExpressServer();
    console.log("Initializing web server module");
    await createConnectionPool();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startup();

const shutdown = async (e?: Error) => {
  console.log("Shutting down application");
  try {
    console.log("Closing database module");
    await closeConnectionPool();
    console.log("Closing web server module");
    httpServer.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(e ? 1 : 0);
};

process.on("SIGTERM", () => shutdown());
process.on("SIGINT", () => shutdown());
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception", err);
  shutdown(err);
});