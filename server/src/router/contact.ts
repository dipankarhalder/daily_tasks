import express from 'express';
import { CONTACTS, CONTACT } from '../config/routers';
import { isAuthenticated, isOwner } from '../middlewares';
import {
  addContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from '../controllers/contact';

export default (router: express.Router) => {
  router.get(
    `${CONTACTS}/:id`,
    isAuthenticated,
    isOwner,
    getAllContacts
  );
  router.post(
    `${CONTACT}/:id`,
    isAuthenticated,
    isOwner,
    addContact
  );
  router.patch(
    `${CONTACT}/:id`,
    isAuthenticated,
    isOwner,
    updateContact
  );
  router.delete(
    `${CONTACT}/:id`,
    isAuthenticated,
    isOwner,
    deleteContact
  );
};
