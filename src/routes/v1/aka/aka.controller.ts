import { FastifyInstance } from "fastify";
import { akaCreateV1 } from "sistem-shared";
import { zodTypeProvider } from "../../../types/fastifyTypeProvider.js";
import { create } from "./aka.service.js";

export default async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<zodTypeProvider>().route({
    method: "POST",
    url: "/create",
    schema: akaCreateV1,
    handler: async (req, res) => {
      const { target } = req.body;
      const { ip } = req;

      const short = await create({ target, createdBy: ip });

      const reply = {
        short,
      };
      res.send(reply);
    },
  });
};
