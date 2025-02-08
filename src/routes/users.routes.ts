import { Router } from "express";
import { prisma } from "../db/prisma";

export const usersRouter = Router();

usersRouter.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
