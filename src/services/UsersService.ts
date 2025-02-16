import { UsersModel } from "../models/UsersModel";
import { querySchema } from "../validations/Queries/listAll";
import { createUsersSchema } from "../validations/Users/createUsersSchema";
import { updateUsersSchema } from "../validations/Users/updateUsersSchema";

export class UsersService {
  private usersModel = new UsersModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.usersModel.listAll(validQuery);
  }

  async getById(idUser: number) {
    return this.usersModel.getById(idUser);
  }

  async create(data: unknown) {
    const validData = createUsersSchema.parse(data);
    return this.usersModel.create(validData);
  }

  async update(idUser: number, data: unknown) {
    const validData = updateUsersSchema.parse(data);
    return this.usersModel.update(idUser, validData);
  }

  async delete(idUser: number) {
    return this.usersModel.delete(idUser);
  }
}
