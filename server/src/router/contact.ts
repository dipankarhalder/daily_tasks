import express from "express";
import { CONTACTS, CONTACT } from "../config/routers";
import { isAuthenticated, isOwner } from "../middlewares";
import { addContact, getAllContacts } from "../controllers/contact";

export default (router: express.Router) => {
  router.get(CONTACTS, isAuthenticated, getAllContacts);
  router.post(CONTACT, isAuthenticated, addContact);
  // router.patch(CONTACT, isAuthenticated, isOwner, updateUser)
  // router.delete(CONTACT, isAuthenticated, isOwner, deleteUser);
}