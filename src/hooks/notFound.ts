import type { RouteHandler } from "fastify";

const notFoundHandler: RouteHandler = (req, res) => {
  res.status(404).send("Not Found");
};

export default notFoundHandler;
