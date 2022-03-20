import { App } from "./app.js";
import { logger } from "./utils/logger.js";

logger.info("API process started");

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught Exception");
});

const app = new App();
app.listen();
