import pkg from "@prisma/client";
import { logger } from "./utils/logger.js";
const { PrismaClient } = pkg;

export const prisma = new PrismaClient({
  log: [
    { level: "error", emit: "event" },
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "query", emit: "event" },
  ],
});

prisma.$on("error", (e) => logger.error({ err: e.message }, "Prisma error"));
prisma.$on("warn", ({ message }) => logger.warn({ message }, "Prisma warn"));
prisma.$on("info", ({ message }) => logger.info({ message }, "Prisma info"));
prisma.$on("query", ({ query, duration, params }) =>
  logger.info({ query, duration, params }, "Prisma query")
);
