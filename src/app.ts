import fastify from "fastify";
import crypto from "node:crypto";
import errorHandler from "./hooks/errorHandler.js";
import notFoundHandler from "./hooks/notFound.js";
import onRequestHook from "./hooks/onRequest.js";
import onResponseHook from "./hooks/onResponse.js";
import validatorCompiler from "./hooks/validatorCompiler.js";
import { ENV } from "./utils/env.js";
import { logger } from "./utils/logger.js";
import v1Route from "./routes/v1/route.js";
import { prisma } from "./prisma.js";
import serializerCompiler from "./hooks/serializerCompiler.js";
import fastifyCors from "fastify-cors";
import corsOptions from "./plugins/cors.js";

export class App {
  #fastify = fastify({
    genReqId: () => crypto.randomUUID(),
  });

  constructor() {
    this.#initializeHooks();
    this.#initializePlugins();
    this.#initializeRoutes();
    this.#initializeConnections();
  }

  #initializeHooks() {
    this.#fastify.addHook("onRequest", onRequestHook);
    this.#fastify.addHook("onResponse", onResponseHook);
    this.#fastify.setErrorHandler(errorHandler);
    this.#fastify.setNotFoundHandler(notFoundHandler);
    this.#fastify.setValidatorCompiler(validatorCompiler);
    this.#fastify.setSerializerCompiler(serializerCompiler);
  }

  #initializePlugins() {
    this.#fastify.register(fastifyCors, corsOptions);
  }

  #initializeRoutes() {
    this.#fastify.register(v1Route, { prefix: "/v1" });
  }

  async #initializeConnections() {
    await this.#connectPrisma();
  }

  async #connectPrisma() {
    try {
      await prisma.$connect();
      logger.info("Prisma connected");
    } catch (err) {
      logger.fatal({ err }, `Prisma cannot connect`);
      return process.exit(5432);
    }
  }

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
