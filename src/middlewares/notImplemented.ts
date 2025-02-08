import { Request, Response } from "express";

export const notImplemented = (req: Request, res: Response) => {
  const { body } = req.body;
  const { authorization } = req.headers;
  res.status(501).send({
    message: "Route not implemented",
    url: req.url,
    method: req.method,
    body,
    authorization,
  });
};
