import { prisma } from "../db/prisma";
import { TQuery } from "../validations/Queries/listAll";
import { TCreateStores } from "../validations/Stores/createStoresSchema";
import { TUpdateStores } from "../validations/Stores/updateStoresSchema";

export class StoresModel {
  async totalCount(query: TQuery) {
    return prisma.store.count({
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

    const result = await prisma.store.findMany({
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

  async getById(idStore: number) {
    return prisma.store.findUnique({ where: { idStore } });
  }

  async create(data: TCreateStores) {
    return prisma.store.create({ data });
  }

  async update(idStore: number, data: TUpdateStores) {
    return prisma.store.update({
      where: { idStore },
      data,
    });
  }

  async delete(idStore: number) {
    return prisma.store.update({
      where: { idStore },
      data: { deletedAt: new Date() },
    });
  }
}
