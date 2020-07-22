import { Router } from "express";
import { getTodos, updateTodo, deleteTodo, addTodo } from "../controllers/todos";

const todosRouter = Router();

todosRouter.get('/', getTodos);
todosRouter.post('/', addTodo);
todosRouter.put('/:id', updateTodo);
todosRouter.delete('/:id', deleteTodo);

export default todosRouter;