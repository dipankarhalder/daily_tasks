import express from 'express';
import { CONTACT } from '../config/routers';
import { isAuthenticated, isOwner } from '../middlewares';
import {
  addContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from '../controllers/contact';

export default (router: express.Router) => {
  router.get(
    `${CONTACT}`,
    isAuthenticated,
    isOwner,
    getAllContacts
  );
  router.post(
    `${CONTACT}`,
    isAuthenticated,
    isOwner,
    addContact
  );
  router.patch(
    `${CONTACT}/:contact`,
    isAuthenticated,
    isOwner,
    updateContact
  );
  router.delete(
    `${CONTACT}/:contact`,
    isAuthenticated,
    isOwner,
    deleteContact
  );
};
