import { Request, Response } from "express";
import { ITodo } from "../../types/todo";
import Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (err) {
    throw err;
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // used typecasting to avoid adding fields from the Document class fron mongoose
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    const { name, description, status } = body;

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
      todo: newTodo,
      todos: allTodos
    });
  } catch (err) {
    throw err
  };
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // object destructuring to get needded attributes
    const { params: { id }, body } = req;

    const updatedTodo = await Todo.findByIdAndUpdate({
      _id: id
    }, body);

    // get updated todos array
    const allTodos = await Todo.find();

    res.status(200).json({
      message: "todo sucessfully updated",
      todo: updatedTodo,
      todos: allTodos
    })
  } catch (err) {
    throw err
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // object destructuring to get needded attributes
    const { params: { id } } = req;

    const deleted = await Todo.findByIdAndDelete({
      _id: id
    });

    // get updated todos array
    const allTodos = await Todo.find();

    res.status(200).json({
      message: "todo sucessfully deleted",
      todo: deleted,
      todos: allTodos
    })
  } catch (err) {
    throw err
  }
}

export { getTodos, deleteTodo, updateTodo, addTodo };