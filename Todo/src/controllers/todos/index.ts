import { Request, Response } from "express";
import { ITodo } from "../../types/todo";
import  Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({todos});
  } catch(err) {
    throw err;
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
      // used typecasting to avoid adding fields from the Document class fron mongoose
      const body = req.body as Pick<ITodo, "name"|"description"|"status">;
      const {name, description, status} = body;
      
      const todo = new Todo({
        name,
        description,
        status
      });

      const newTodo = await todo.save();
      // get updated todos array
      const allTodos = await Todo.find();

      res.status(201).json({
        message: "todo sucessfully addded",
        todo:newTodo,
        todos: allTodos
      });
  } catch(err) {
    throw err
  };
}