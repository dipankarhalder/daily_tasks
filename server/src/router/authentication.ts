import express from "express";

import { REGISTER, LOGIN } from "../config/routers";
import { register, login } from "../controllers/authentication";

// register router
export default (router: express.Router) => {
  router.post(REGISTER, register);
  router.post(LOGIN, login);
}