import express from "express";
import { USERS, USER } from "../config/routers";
import { isAuthenticated, isOwner } from "../middlewares";
import { getAllUsers, viewUser, updateUser, deleteUser } from "../controllers/users";

export default (router: express.Router) => {
  router.get(USERS, isAuthenticated, getAllUsers);
  router.get(USER, isAuthenticated, isOwner, viewUser)
  router.patch(USER, isAuthenticated, isOwner, updateUser)
  router.delete(USER, isAuthenticated, isOwner, deleteUser);
}