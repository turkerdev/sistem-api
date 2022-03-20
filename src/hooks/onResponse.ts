import type { onResponseHookHandler } from "fastify";
import { logger } from "../utils/logger.js";

const onResponseHook: onResponseHookHandler = (req, res, next) => {
  const response_time = res.getResponseTime();
  const thirtySecond = 30 * 1000;

  const data = {
    id: req.id,
    status_code: res.statusCode,
    response_time: response_time.toFixed(3),
    request:
      response_time > thirtySecond
        ? {
            body: req.body,
            headers: req.headers,
          }
        : undefined,
  };

  logger.info({ data }, "Response");
  next();
};

export default onResponseHook;
