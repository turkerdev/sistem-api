import { FastifyCorsOptionsDelegateCallback } from "fastify-cors";
import { ENV } from "../utils/env.js";

export default (): FastifyCorsOptionsDelegateCallback => (req, cb) => {
  const local = ENV.NODE_ENV === "development";
  const self = req.headers.origin
    ? /turker.dev$/.test(req.headers.origin)
    : false;

  if (local || self) {
    return cb(null, { origin: true });
  }

  return cb(null, { origin: false });
};
