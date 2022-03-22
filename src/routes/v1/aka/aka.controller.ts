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

      const reply = {
        short,
      };
      res.send(reply);
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

      const reply = {
        target,
      };

      res.send(reply);
    },
  });
};
