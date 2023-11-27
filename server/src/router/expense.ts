import express from 'express';
import { EXPENSE } from '../config/routers';
import { isAuthenticated, isOwner } from '../middlewares';
import {
  getAllExpenses,
  addExpense,
} from '../controllers/expense';

export default (router: express.Router) => {
  router.get(
    EXPENSE,
    isAuthenticated,
    isOwner,
    getAllExpenses
  );
  router.post(
    EXPENSE,
    isAuthenticated,
    isOwner,
    addExpense
  );
  // router.patch(
  //   `${EXPENSE}/:id`,
  //   isAuthenticated,
  //   isOwner,
  //   updateContact
  // );
  // router.delete(
  //   `${EXPENSE}/:id`,
  //   isAuthenticated,
  //   isOwner,
  //   deleteContact
  // );
};
