import express from "express";
import {
  cookie_name,
  userValidate,
  emailValidate,
  emailRegex,
  emailReg,
  passwordValidate,
  phoneValidate,
  notEmail,
  wrongPass,
  existUser,
  somethingWrong,
} from "../../config/static";
import { getUserByEmail, getUserByPhone, createUser } from "../../db/users";
import { random, authentication } from "../../helpers";

/* 
  @method: POST
  @endpoint: /v1/auth/signin
  @details: login
*/
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: emailValidate });
    }
    if (!password) {
      return res.status(400).json({ msg: passwordValidate });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(400).json({ msg: `${email} ${notEmail}` });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.status(400).json({ msg: wrongPass });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie(cookie_name, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json({ msg: somethingWrong });
  }
};

/* 
  @method: POST
  @endpoint: /v1/auth/signup
  @details: register
*/
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username) {
      return res.status(400).json({ msg: userValidate });
    }
    if (!email) {
      return res.status(400).json({ msg: emailValidate });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: emailReg });
    }
    if (!phone) {
      return res.status(400).json({ msg: phoneValidate });
    }
    if (!password) {
      return res.status(400).json({ msg: passwordValidate });
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ msg: `${email} ${existUser}` });
    }

    const existingPhone = await getUserByPhone(phone);
    if (existingPhone) {
      return res.status(400).json({ msg: `${phone} ${existUser}` });
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
    return res.status(400).json({ msg: somethingWrong });
  }
};
