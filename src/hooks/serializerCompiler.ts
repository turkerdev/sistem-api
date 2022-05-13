import { FastifySerializerCompiler } from "fastify/types/schema";
import { ZodAny } from "zod";
import { APIError } from "../utils/apierror.js";

const serializerCompiler: FastifySerializerCompiler<ZodAny> =
  ({ schema }) =>
  (data) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return JSON.stringify(result.data);
    }
    throw new APIError(500, {
      path: "modal",
      messages: ["Something went wrong! :("],
    });
  };

export default serializerCompiler;
