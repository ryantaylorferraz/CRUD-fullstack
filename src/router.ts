import { Request, Response, Router } from "express";

const allTodos = [{nome: "Ryan", status: false}]
export const crudRouter = Router()

crudRouter.post("/todos", (req: Request, res: Response) => {
    const {nome} = req.body;
    allTodos.push({nome, status: false})
    return res.status(201).json("nome enviado com sucesso")
})

crudRouter.get("/todos", (req: Request, res: Response) => {
    return res.status(200).json(allTodos)
})