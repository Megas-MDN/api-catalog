import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USERS; // /api/v1/users

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get(`${BASE_PATH}`, async (req, res) => {
  await usersController.listAll(req, res);
});

usersRoutes.get(`${BASE_PATH}/:idUser`, async (req, res) => {
  await usersController.getById(req, res);
});

usersRoutes.post(`${BASE_PATH}`, async (req, res) => {
  await usersController.create(req, res);
});

usersRoutes.put(`${BASE_PATH}/:idUser`, async (req, res) => {
  await usersController.update(req, res);
});

usersRoutes.delete(`${BASE_PATH}/:idUser`, async (req, res) => {
  await usersController.delete(req, res);
});

export { usersRoutes };
