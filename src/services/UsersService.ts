import { UsersModel } from "../models/UsersModel";
import { IPayloadToken } from "../types/IPayloadToken";
import { genToken } from "../utils/jwt";
import { removePassword } from "../utils/removePassword";
import { querySchema } from "../validations/Queries/listAll";
import { createUsersSchema } from "../validations/Users/createUsersSchema";
import { TLoginUsers } from "../validations/Users/loginUserSchema";
import { updateUsersSchema } from "../validations/Users/updateUsersSchema";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { genStrongPass } from "../utils/genStrongPass";
import { AppError } from "../models/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";

export class UsersService {
  private usersModel = new UsersModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.usersModel.listAll(validQuery);
  }

  async getById(idUser: number, isRemovePassword = true) {
    const user = await this.usersModel.getById(idUser);
    if (!user) return null;

    if (isRemovePassword) {
      return removePassword(user) as user;
    }

    return this.usersModel.getById(idUser);
  }

  async create(data: unknown) {
    const validData = createUsersSchema.parse(data);
    const hashPassword = await bcrypt.hash(
      validData.password || genStrongPass(),
      10,
    );
    return this.usersModel.create({ ...validData, password: hashPassword });
  }

  async update(idUser: number, data: unknown) {
    const validData = updateUsersSchema.parse(data);
    return this.usersModel.update(idUser, validData);
  }

  async delete(idUser: number) {
    return this.usersModel.delete(idUser);
  }

  async register(data: unknown) {
    const validData = createUsersSchema.parse(data);
    const newUser = await this.usersModel.create(validData);
    const myUUID = uuidv4();
    const payload: IPayloadToken = {
      id: myUUID,
      sum: newUser.idUser,
    };
    const token = genToken(payload);
    return { token, user: removePassword(newUser) };
  }

  async login(data: TLoginUsers) {
    const { email, password } = data;
    const user = await this.usersModel.getByEmail(email);
    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password || "");

    if (!isValidPassword) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const myUUID = uuidv4();
    const payload: IPayloadToken = {
      id: myUUID,
      sum: user.idUser,
    };
    const token = genToken(payload);
    return { token, user: removePassword(user) };
  }
}
