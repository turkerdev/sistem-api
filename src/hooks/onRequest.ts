import type { onRequestHookHandler } from "fastify";
import { logger } from "../utils/logger.js";

const onRequestHook: onRequestHookHandler = (req, res, next) => {
  const data = {
    id: req.id,
    method: req.method,
    url: req.url,
    ip: req.ip,
    headers: {
      ua: req.headers["user-agent"],
      referer: req.headers.referer,
    },
  };

  logger.info({ data }, "Request");
  next();
};

export default onRequestHook;
