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
}
