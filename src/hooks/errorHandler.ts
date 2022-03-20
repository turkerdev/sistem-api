import type { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../utils/logger.js";

const errorHandler = (err: unknown, req: FastifyRequest, res: FastifyReply) => {
  const data = {
    id: req.id,
    body: req.body,
    headers: req.headers,
  };
  logger.error({ data, err }, "Error");

  res.status(500).send("Error");
};

export default errorHandler;
