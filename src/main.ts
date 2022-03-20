import { logger } from "./utils/logger.js";

logger.info("API process started");

process.on("exit", (code) => {
  logger.info({ code }, `API process exiting`);
});

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught Exception");
});
