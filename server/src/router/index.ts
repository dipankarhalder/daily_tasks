import express from "express";
import authentication from "./authentication";
import contact from "./contact";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  contact(router);

  return router;
}