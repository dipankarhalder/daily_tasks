import express from "express";
import { 
  something_wrong, 
  blank_validation_message, 
  associated_info,
  blank_user_info, 
  exist_contact 
} from "../config/static";
import { 
  getContacts, 
  getContactByPhone, 
  createContact, 
} from "../db/contact";

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
    return res
      .status(200)
      .json(users);

  } catch(error) {
    return res
      .status(400)
      .json({ msg: something_wrong });
  }
}

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
    const { name, phone, notype } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ msg: `Name ${blank_validation_message}` });
    }
    if (!phone.length) {
      return res
        .status(400)
        .json({ msg: `Phone ${blank_validation_message}` });
    }
    if (!notype) {
      return res
        .status(400)
        .json({ msg: `Number type ${blank_validation_message}` });
    }
    if(phone.length) {
      return phone.map((item: { phone: string; }) => {
        const existingPhone = getContactByPhone(item.phone);
        if (existingPhone) {
          return res.status(400).json({ msg: `${item.phone} ${associated_info}` });
        }
      });
    }
    
    const addNewContact = await createContact(req.body);
    return res.status(200).json(addNewContact).end();
  } catch (error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// update contact
export const updateContact = async (req: express.Request, res: express.Response) => {
  try {
    const { name, phone, notype } = req.body;
    if (!name || !phone || !notype) {
      return res.status(400).json({ msg: blank_user_info });
    }

    const newContact = await createContact(req.body);
    return res.status(200).json(newContact).end();
  } catch (error) {
    return res.status(400).json({ msg: something_wrong });
  }
}