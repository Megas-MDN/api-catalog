import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { StoresService } from "../services/StoresService";
import { STATUS_CODE } from "../constants/statusCode";

export class StoresController {
  private storesService = new StoresService();

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.storesService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getById(req: CustomRequest<unknown>, res: Response) {
    const result = await this.storesService.getById(
      Number(req.params.idStores),
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async create(req: CustomRequest<unknown>, res: Response) {
    const result = await this.storesService.create(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async update(req: CustomRequest<unknown>, res: Response) {
    const result = await this.storesService.update(
      Number(req.params.idStores),
      req.body,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: CustomRequest<unknown>, res: Response) {
    const result = await this.storesService.delete(Number(req.params.idStores));
    return res.status(STATUS_CODE.OK).json(result);
  }
}
