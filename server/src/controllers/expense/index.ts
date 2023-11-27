import express from 'express';
import { ExpenseModel } from '../../db/expense';
import {
  somethingWrong,
  blankField,
  succCreated,
  succUpdate,
  succDelete,
} from '../../config/static';
import {
  _getListOfItems,
  _createItem,
  _updateItemById,
  _deleteItemById,
} from '../../db/shared';

/* 
  @method: GET
  @endpoint: /v1/expense/:id
  @details: get all the list of expense
*/
export const getAllExpenses = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const expenses = await _getListOfItems(ExpenseModel);
    return res.json({
      code: 200,
      data: expenses,
      message: '',
    });
  } catch (error) {
    return res.json({
      code: 400,
      data: null,
      message: somethingWrong,
    });
  }
};

/* 
  @method: POST
  @endpoint: /v1/expense/:id
  @details: create a new expense
*/
export const addExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { expDate, expRecord } = req.body;
    if (!expDate) {
      return res
        .status(400)
        .json({ message: `Date ${blankField}` });
    }
    if (!expRecord.length) {
      return res
        .status(400)
        .json({ message: `Records ${blankField}` });
    }

    const newExpense = await _createItem(
      ExpenseModel,
      req.body
    );
    return res
      .json({
        code: 200,
        data: newExpense,
        message: succCreated,
      })
      .end();
  } catch (error) {
    return res.json({
      code: 400,
      data: null,
      message: somethingWrong,
    });
  }
};

/* 
  @method: PATCH
  @endpoint: /v1/expense/:id/:expense
  @details: update any item from expense 
*/
export const updateExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { expense } = req.params;
    await _updateItemById(ExpenseModel, expense, req.body);
    return res
      .json({ code: 200, message: succUpdate, data: null })
      .end();
  } catch (error) {
    return res.json({
      code: 400,
      message: somethingWrong,
      data: null,
    });
  }
};

/* 
  @method: DELETE
  @endpoint: /v1/expense/:id/:expense
  @details: delete any expense from the records  
*/
export const deleteExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { expense } = req.params;
    await _deleteItemById(ExpenseModel, expense);
    return res
      .json({ code: 200, message: succDelete, data: null })
      .end();
  } catch (error) {
    return res.json({
      code: 400,
      message: somethingWrong,
      data: null,
    });
  }
};
