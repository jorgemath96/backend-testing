import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const userData = {
  user: process.env.USER,
  password: process.env.PASSWORD,
};

export const authenticate = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (user !== userData.user || password !== userData.password)
    return res.status(401).json();

  const payload = {
    user: user,
  };
  const secret = process.env.SECRET_KEY || "s3c43t.k37";
  const options = { expiresIn: 3600 * 1000 };
  const token = await jwt.sign(payload, secret, options);
  return res.status(200).json({ token });
};
