import { UsersModel } from "../models/UsersModel";
import { querySchema } from "../validations/Queries/listAll";

export class UsersService {
  private usersModel = new UsersModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.usersModel.listAll(validQuery);
  }
}
