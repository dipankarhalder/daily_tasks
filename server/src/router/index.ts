import express from "express";

// all routes import
import authentication from "./authentication";
import users from "./users";

// router with default exported
const router = express.Router();
export default (): express.Router => {
  authentication(router);
  users(router);

  return router;
}