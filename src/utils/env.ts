import z from "zod";

const nodeEnvSchema = z.enum(["development", "production"]);
const NODE_ENV = nodeEnvSchema.parse(process.env.NODE_ENV);

const DEFAULT_PORT = 3300;
const DEFAULT_HOST = "127.0.0.1";
const IS_DEVELOPMENT = NODE_ENV === "development";

const schema = z.object({
  PORT: z.preprocess(
    (val) => +String(val) || undefined,
    IS_DEVELOPMENT
      ? z.number().max(65535).default(DEFAULT_PORT)
      : z.number().max(65535)
  ),
  HOST: z.string().optional().default(DEFAULT_HOST),
  DATABASE_URL: z.string(),
});

export const ENV = schema
  .extend({ NODE_ENV: nodeEnvSchema })
  .parse(process.env);
