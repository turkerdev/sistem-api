import { FastifyInstance } from "fastify";
import { akaCreateV1 } from "sistem-shared";
import { zodTypeProvider } from "../../../types/fastifyTypeProvider.js";

export default async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<zodTypeProvider>().route({
    method: "POST",
    url: "/create",
    schema: akaCreateV1,
    handler: async (req) => {
      return req.body;
    },
  });
};
