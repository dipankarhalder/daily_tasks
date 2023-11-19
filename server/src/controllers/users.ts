import express from "express";

// all important methods and helpers
import { something_wrong } from "../config/static";
import { getUsers, getUserById, deleteUserById } from "../db/users";

// get all users from the list
export const getAllUsers = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// delete the user based on id
export const viewUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.json(user);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// update the user based on id
export const updateUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // validate the username exist or not
    if(!username) {
      return res.status(400).json({ 
        msg: `${username} does not exist.` 
      });
    }

    const user = await getUserById(id);
    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// delete the user based on id
export const deleteUser = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteRecord = await deleteUserById(id);
    return res.json(deleteRecord);
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}