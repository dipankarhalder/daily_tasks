import express from "express";
import { get, merge } from "lodash";
import { access_denied, something_wrong, cookie_name } from "../config/static";

// import helper func
import { getUserBySessionToken } from "../db/users";

// request handle using a particular id
export const isOwner = async (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    // check user login or not
    if(!currentUserId) {
      return res.status(403).json({ msg: access_denied });
    }

    // check current user match with id or not
    if(currentUserId.toString() !== id) {
      return res.status(403).json({ msg: access_denied });
    }

    next();
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

// authentication request handle with thos middleware
export const isAuthenticated = async (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[cookie_name];

    // check session token you have or not
    if(!sessionToken) {
      return res.status(403).json({ msg: access_denied });
    }

    // check existing user or not
    const existingUser = await getUserBySessionToken(sessionToken);
    if(!existingUser) {
      return res.status(403).json({ msg: access_denied });
    }

    merge(req, { identity: existingUser });
    return next();
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}