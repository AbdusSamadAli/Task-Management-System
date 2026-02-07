import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as service from "./task.service";

export const getAll = async (req: AuthRequest, res: Response) => {
  const { page = 1, status, search } = req.query;
  const tasks = await service.getTasks(
    req.userId!,
    Number(page),
    status as string,
    search as string
  );
  res.json(tasks);
};

export const create = async (req: AuthRequest, res: Response) => {
  const task = await service.createTask(req.userId!, req.body.title);
  res.status(201).json(task);
};

export const update = async (req: AuthRequest, res: Response) => {
  await service.updateTask(+req.params.id, req.userId!, req.body.title);
  res.json({ message: "Updated" });
};

export const remove = async (req: AuthRequest, res: Response) => {
  await service.deleteTask(+req.params.id, req.userId!);
  res.json({ message: "Deleted" });
};

export const toggle = async (req: AuthRequest, res: Response) => {
  const task = await service.toggleTask(+req.params.id, req.userId!);
  res.json(task);
};
