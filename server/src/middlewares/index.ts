import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';
import { accessDenied, somethingWrong, cookie_name } from '../config/static';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;
    if (!currentUserId) {
      return res.status(403).json({ msg: accessDenied });
    }
    if (currentUserId.toString() !== id) {
      return res.status(403).json({ msg: accessDenied });
    }
    next();
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[cookie_name];
    if (!sessionToken) {
      return res.status(403).json({ msg: accessDenied });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({ msg: accessDenied });
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};
