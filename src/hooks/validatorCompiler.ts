import { FastifySchemaCompiler } from "fastify";
import { ZodAny } from "zod";

const validatorCompiler: FastifySchemaCompiler<ZodAny> =
  ({ schema }) =>
  (data) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { value: result.data };
    }
    return { error: result.error };
  };

export default validatorCompiler;
