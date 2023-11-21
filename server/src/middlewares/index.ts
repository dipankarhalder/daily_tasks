import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";
import { access_denied, something_wrong, cookie_name } from "../config/static";

export const isOwner = async (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;
    if(!currentUserId) {
      return res.status(403).json({ msg: access_denied });
    }
    if(currentUserId.toString() !== id) {
      return res.status(403).json({ msg: access_denied });
    }
    next();
  } catch(error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

export const isAuthenticated = async (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[cookie_name];
    if(!sessionToken) {
      return res.status(403).json({ msg: access_denied });
    }

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