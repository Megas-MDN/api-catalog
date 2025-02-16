import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UsersService } from "../services/UsersService";
import { STATUS_CODE } from "../constants/statusCode";

export class UsersController {
  private usersService = new UsersService();

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.usersService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getById(req: CustomRequest<unknown>, res: Response) {
    const result = await this.usersService.getById(Number(req.params.idUser));
    return res.status(STATUS_CODE.OK).json(result);
  }

  async create(req: CustomRequest<unknown>, res: Response) {
    const result = await this.usersService.create(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async update(req: CustomRequest<unknown>, res: Response) {
    const result = await this.usersService.update(
      Number(req.params.idUser),
      req.body,
    );
    return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: CustomRequest<unknown>, res: Response) {
    const result = await this.usersService.delete(Number(req.params.idUser));
    return res.status(STATUS_CODE.OK).json(result);
  }
}
