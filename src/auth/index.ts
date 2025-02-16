import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { NextFunction, Response } from "express";
import { user } from "@prisma/client";
import { IPayloadToken } from "../types/IPayloadToken";
import { UsersService } from "../services/UsersService";
import { AppError } from "../models/AppError";

const checkToken = async (token: string): Promise<user | null> => {
  const data = verifyToken(token) as IPayloadToken | null;
  if (!data) {
    return null;
  }

  const user = await new UsersService().getById(data.sum);
  if (!user) {
    return null;
  }

  return user;
};

export const auth = async (
  req: CustomRequest<unknown>,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];

  const user = await checkToken(token);
  if (user) {
    if (!user || user.deletedAt) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    req.user = user;
    return next();
  }

  throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
};
