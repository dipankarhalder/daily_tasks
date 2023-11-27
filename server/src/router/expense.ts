import express from 'express';
import { EXPENSES, EXPENSE } from '../config/routers';
import { isAuthenticated } from '../middlewares';
import {
  addContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from '../controllers/contact';

export default (router: express.Router) => {
  router.get(EXPENSES, isAuthenticated, getAllContacts);
  router.post(EXPENSE, isAuthenticated, addContact);
  router.patch(`${EXPENSE}/:id`, isAuthenticated, updateContact);
  router.delete(`${EXPENSE}/:id`, isAuthenticated, deleteContact);
};
