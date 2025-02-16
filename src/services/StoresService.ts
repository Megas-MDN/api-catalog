import { StoresModel } from "../models/StoresModel";
import { querySchema } from "../validations/Queries/listAll";
import { createStoresSchema } from "../validations/Stores/createStoresSchema";
import { updateStoresSchema } from "../validations/Stores/updateStoresSchema";

export class StoresService {
  private storesModel = new StoresModel();

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.storesModel.listAll(validQuery);
  }

  async getById(idStores: number) {
    return this.storesModel.getById(idStores);
  }

  async create(data: unknown) {
    const validData = createStoresSchema.parse(data);
    return this.storesModel.create(validData);
  }

  async update(idStores: number, data: unknown) {
    const validData = updateStoresSchema.parse(data);
    return this.storesModel.update(idStores, validData);
  }

  async delete(idStores: number) {
    return this.storesModel.delete(idStores);
  }
}
