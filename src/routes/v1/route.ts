import { FastifyInstance } from "fastify";
import aka from "./aka/aka.controller.js";

export default async (fastify: FastifyInstance) => {
  fastify.register(aka, { prefix: "/aka" });
};
