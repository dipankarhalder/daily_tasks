import express from 'express';
import { ContactModel } from '../../db/contact';
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
  @endpoint: /v1/contact/:id
  @details: get all the list of contacts
*/
export const getAllContacts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const contacts = await _getListOfItems(ContactModel);
    return res.json({
      code: 200,
      data: contacts,
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
  @endpoint: /v1/contact/:id
  @details: create a new contact
*/
export const addContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, record } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: `Name ${blankField}` });
    }
    if (!record.length) {
      return res
        .status(400)
        .json({ message: `Records ${blankField}` });
    }

    const newContact = await _createItem(
      ContactModel,
      req.body
    );
    return res
      .json({
        code: 200,
        data: newContact,
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
  @endpoint: /v1/contact/:id/:contact
  @details: update any item from contacts 
*/
export const updateContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { contact } = req.params;
    await _updateItemById(ContactModel, contact, req.body);
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
  @endpoint: /v1/contact/:id/:contact
  @details: delete any contact from the records  
*/
export const deleteContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { contact } = req.params;
    await _deleteItemById(ContactModel, contact);
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
