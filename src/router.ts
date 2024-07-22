import { request, Request, Response, Router } from "express";
import { prisma } from "./database/database";

export const crudRouter = Router();

crudRouter.post("/todos", async (req: Request, res: Response) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  return res.status(201).json(todo);
});

crudRouter.get("/todos", async (req: Request, res: Response) => {
  const read = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return res.status(200).json(read);
});

crudRouter.patch("/todos", async (req: Request, res: Response) => {
  const { name, id, status } = req.body;

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id },
  });
  if (!todoAlreadyExist) {
    return res.status(404).json("Todo is not found");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });
  return res.status(200).json(todo);
});

crudRouter.delete("/todos/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todoId = Number(id);

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }
  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todoAlreadyExist) {
    return res.status(404).json("Todo not exist");
  }

  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
  return res.status(200).json({message: "todo excluida com sucesso"})
});
