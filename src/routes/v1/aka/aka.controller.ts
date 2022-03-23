import { FastifyInstance } from "fastify";
import { akaCreateV1, akaGetV1 } from "sistem-shared";
import { zodTypeProvider } from "../../../types/fastifyTypeProvider.js";
import { create, get } from "./aka.service.js";

export default async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<zodTypeProvider>().route({
    method: "POST",
    url: "/create",
    schema: akaCreateV1,
    handler: async (req, res) => {
      const { target } = req.body;
      const { ip } = req;

      const short = await create({ target, createdBy: ip });

      res.send({ short });
    },
  });

  fastify.withTypeProvider<zodTypeProvider>().route({
    method: "GET",
    url: "/get/:short",
    schema: akaGetV1,
    handler: async (req, res) => {
      const { short } = req.params;
      const { ip } = req;

      const target = await get({ short, clickedBy: ip });

      if (!target) {
        return res.callNotFound();
      }

      res.send({ target });
    },
  });
};
