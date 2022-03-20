import fastify from "fastify";
import { ENV } from "./utils/env.js";
import { logger } from "./utils/logger.js";

export class App {
  #fastify = fastify();

  listen() {
    // Use async/await try/catch when the new version released
    this.#fastify.listen(
      {
        port: ENV.PORT,
        host: ENV.HOST,
      },
      (err, addr) => {
        if (err) {
          logger.fatal({ err }, `Server cannot listen @ :${ENV.PORT}`);
          return process.exit(3300);
        }
        logger.info(`Server listening @ ${addr}`);
      }
    );
  }
}
