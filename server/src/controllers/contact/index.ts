import express from "express";
import { somethingWrong, blankField } from "../../config/static";
import {
  getContacts,
  createContact,
  updateContactById,
  deleteContactById,
} from "../../db/contact";

/* 
  @method: GET
  @endpoint: /v1/contacts
  @details: get all the contacts from list
*/
export const getAllContacts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getContacts();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};

/* 
  @method: POST
  @endpoint: /v1/contact
  @details: create a new contact
*/
export const addContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, record } = req.body;
    if (!name) {
      return res.status(400).json({ msg: `Name ${blankField}` });
    }
    if (!record.length) {
      return res.status(400).json({ msg: `Records ${blankField}` });
    }

    const addNewContact = await createContact(req.body);
    return res.status(200).json(addNewContact).end();
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};

/* 
  @method: POST
  @endpoint: /v1/contact/:id
  @details: update any item from user 
*/
export const updateContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const newContact = await updateContactById(id, req.body);
    return res.status(200).json(newContact).end();
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};

/* 
  @method: DELETE
  @endpoint: /v1/contact/:id
  @details: delete any contact from the records  
*/
export const deleteContact = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const delContact = await deleteContactById(id);
    return res.json(delContact);
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};
