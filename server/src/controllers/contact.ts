import express from "express";

// all important methods and helpers
import { something_wrong, not_change_email, blank_user_info, exist_contact } from "../config/static";
import { getContacts, getContactById, getContactByPhone, createContact, updateContactById, deleteContactById } from "../db/contact";

// new contact
export const addContact = async (req: express.Request, res: express.Response) => {
  try {
    const { name, phone, notype } = req.body;
    if (!name || !phone || !notype) {
      return res.status(400).json({ msg: blank_user_info });
    }

    const existingPhone = await getContactByPhone(phone);
    if (existingPhone) {
      return res.status(400).json({ msg: `${phone} ${exist_contact}` });
    }

    console.log(req.body)
    const newContact = await createContact(req.body);
    return res.status(200).json(newContact).end();
  } catch (error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// get all users from the list
export const getAllContacts = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getContacts();
    return res.status(200).json(users);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}