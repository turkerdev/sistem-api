import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { APIError, APIErrorObject } from "../utils/apierror.js";
import { logger } from "../utils/logger.js";

const errorHandler = (err: unknown, req: FastifyRequest, res: FastifyReply) => {
  if (err instanceof APIError) {
    return res.status(err.status).send(err.error);
  }

  if (err instanceof ZodError) {
    const { fieldErrors, formErrors } = err.flatten();

    if (formErrors.length > 0) {
      const errObject: APIErrorObject = {
        path: "modal",
        messages: formErrors,
      };
      const format = new APIError(400, errObject);
      return res.status(format.status).send(format.error);
    }

    const errObject: APIErrorObject[] = Object.keys(fieldErrors).map((key) => ({
      path: key,
      messages: fieldErrors[key],
    }));
    const format = new APIError(400, errObject);
    return res.status(format.status).send(format.error);
  }

  const data = {
    id: req.id,
    body: req.body,
    headers: req.headers,
  };
  logger.error({ data, err }, "Error");

  const fallback = new APIError(500, {
    path: "modal",
    messages: ["Something went wrong! :("],
  });
  res.status(fallback.status).send(fallback.error);
};

export default errorHandler;
