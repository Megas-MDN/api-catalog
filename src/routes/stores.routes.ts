import { Router } from "express";
import { StoresController } from "../controllers/StoresController";

import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.STORES; // /api/v1/stores

const storesRoutes = Router();

const storesController = new StoresController();

storesRoutes.get(`${BASE_PATH}`, async (req, res) => {
  await storesController.listAll(req, res);
});

storesRoutes.get(`${BASE_PATH}/:idStores`, async (req, res) => {
  await storesController.getById(req, res);
});

storesRoutes.post(`${BASE_PATH}`, async (req, res) => {
  await storesController.create(req, res);
});

storesRoutes.put(`${BASE_PATH}/:idStores`, async (req, res) => {
  await storesController.update(req, res);
});

storesRoutes.delete(`${BASE_PATH}/:idStores`, async (req, res) => {
  await storesController.delete(req, res);
});

export { storesRoutes };
