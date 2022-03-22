import { FastifySchemaCompiler } from "fastify";
import { ZodAny } from "zod";

const validatorCompiler: FastifySchemaCompiler<ZodAny> =
  ({ schema }) =>
  async (data) => {
    const result = await schema.spa(data);
    if (result.success) {
      return { value: result.data };
    }
    return { error: result.error };
  };

export default validatorCompiler;
