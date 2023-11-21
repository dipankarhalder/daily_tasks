import express from "express";
import { 
  cookie_name, 
  blank_user_info, 
  email_pass, 
  not_email, 
  wrong_pass, 
  exist_user, 
  something_wrong 
} from "../../config/static";
import { getUserByEmail, createUser } from "../../db/users";
import { random, authentication } from "../../helpers";

export const login = async (
  req: express.Request, 
  res: express.Response
) => {
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: email_pass });
    }

    const user = await getUserByEmail(email)
      .select('+authentication.salt +authentication.password');
    if (!user) {
      return res.status(400).json({ msg: `${email} ${not_email}` });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.status(400).json({ msg: wrong_pass });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();
    res.cookie(
      cookie_name, 
      user.authentication.sessionToken, 
      { domain: 'localhost', path: "/" }
    );

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({ msg: something_wrong });
  }
}

export const register = async (
  req: express.Request, 
  res: express.Response
) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: blank_user_info });
    }
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: `${email} ${exist_user}` });
    }

    const salt = random();
    const newUser = await createUser({
      email,
      username,
      phone,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(newUser).end();
  } catch (error) {
    return res.status(400).json({ msg: something_wrong });
  }
}