import { prisma } from "../db/prisma";
import { TQuery } from "../validations/Queries/listAll";
import { TCreateUsers } from "../validations/Users/createUsersSchema";
import { TUpdateUsers } from "../validations/Users/updateUsersSchema";

export class UsersModel {
  async totalCount(query: TQuery) {
    return prisma.user.count({
      where: {
        name: {
          contains: query.search,
        },
        deletedAt: null,
      },
    });
  }

  async listAll(query: TQuery) {
    const limit = query.limit || 20;
    const skip = query.page ? query.page * limit : query.offset || 0;
    const orderBy =
      query.orderBy?.map(({ field, direction }) => ({
        [field]: direction,
      })) || [];

    const result = await prisma.user.findMany({
      where: {
        name: {
          contains: query.search,
        },
        deletedAt: null,
      },
      take: limit,
      skip,
      orderBy,
    });

    const totalCount = await this.totalCount(query);

    return { result, totalCount };
  }

  async getById(idUser: number) {
    return prisma.user.findUnique({ where: { idUser } });
  }

  async create(data: TCreateUsers) {
    return prisma.user.create({ data });
  }

  async update(idUser: number, data: TUpdateUsers) {
    return prisma.user.update({
      where: { idUser },
      data,
    });
  }

  async delete(idUser: number) {
    return prisma.user.update({
      where: { idUser },
      data: { deletedAt: new Date() },
    });
  }
}
