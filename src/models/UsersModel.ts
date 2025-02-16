import { prisma } from "../db/prisma";
import { TQuery } from "../validations/Queries/listAll";

export class UsersModel {
  async listAll(query: TQuery) {
    const limit = query.limit || 20;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    return { result: [], totalCount: 0, limit, skip, orderBy };
  }
}
