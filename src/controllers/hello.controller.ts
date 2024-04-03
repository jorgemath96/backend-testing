import { Request, Response } from "express";

export const helloWorld = (_: Request, res: Response) => {
  return res.type("text").status(200).send("Hello, world!");
};
