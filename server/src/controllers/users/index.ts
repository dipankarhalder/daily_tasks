import express from 'express';
import { UserModel } from '../../db/users';
import {
  somethingWrong,
  readOnlyEmail,
  succUpdate,
  succDelete,
} from '../../config/static';
import {
  _getListOfItems,
  _getListById,
  _updateItemById,
  _deleteItemById,
} from '../../db/shared';

/* 
  @method: GET
  @endpoint: /v1/users
  @details: get all the users from list
*/
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await _getListOfItems(UserModel);
    return res.json({
      code: 200,
      data: users,
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
  @method: GET
  @endpoint: /v1/user/:id
  @details: view a user informations
*/
export const viewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await _getListById(UserModel, id);
    return res.json({
      code: 200,
      data: user,
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
  @method: PATCH
  @endpoint: /v1/user/:id
  @details: update any item from user 
*/
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (email) {
      return res
        .status(400)
        .json({ msg: `${readOnlyEmail} ${email}` });
    }

    await _updateItemById(UserModel, id, req.body);
    return res
      .json({ code: 200, data: null, message: succUpdate })
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
  @method: DELETE
  @endpoint: /v1/user/:id
  @details: delete any user records 
*/
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await _deleteItemById(UserModel, id);
    return res.json({
      code: 200,
      message: succDelete,
      data: null,
    });
  } catch (error) {
    return res.json({
      code: 400,
      data: null,
      message: somethingWrong,
    });
  }
};
