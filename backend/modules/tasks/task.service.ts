import prisma from "../../config/prisma";

export const getTasks = async (
  userId: number,
  page: number,
  status?: string,
  search?: string
) => {
  return prisma.task.findMany({
    where: {
      userId,
      ...(status && { completed: status === "completed" }),
      ...(search && { title: { contains: search } }),
    },
    skip: (page - 1) * 10,
    take: 10,
  });
};

export const createTask = (userId: number, title: string) =>
  prisma.task.create({ data: { title, userId } });

export const updateTask = (id: number, userId: number, title: string) =>
  prisma.task.updateMany({ where: { id, userId }, data: { title } });

export const deleteTask = (id: number, userId: number) =>
  prisma.task.deleteMany({ where: { id, userId } });

export const toggleTask = async (id: number, userId: number) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error("Not found");

  return prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
};
