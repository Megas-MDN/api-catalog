import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { storesRoutes } from "./stores.routes";

export const routes = Router();
routes.use(usersRoutes);
routes.use(storesRoutes);
