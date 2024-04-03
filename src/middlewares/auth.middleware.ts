import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/auth.lib";

async function isAuth(req: Request, res: Response, next: NextFunction) {
  // if (!req.headers.authorization) return res.status(400).json();

  // The authorization was nost established; verifyToken always is true (time)...
  const token = req.headers.authorization || "";
  const isValid = await verifyToken(token);
  if (!isValid) return res.status(401).json();

  next();
}

export default isAuth;
