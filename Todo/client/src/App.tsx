import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { getTodos, deleteTodo, updateTodo, addTodo } from './API';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  // useEffect with no dependencies run on mount and dismisses on unmount 
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos().then(({ data: { todos } }: ITodo[] | any) => {
      setTodos(todos);
    })
      .catch((err: Error) => console.log(err));
  };

  const handleAdd = (evt: React.FormEvent, todo: ITodo) => {
    evt.preventDefault();
    addTodo(todo).then(({ status, data }) => {
      if (status !== 201) {
        throw new Error("Error adding todo");
      }
      setTodos(data.todos);
    });
  }

  const handleDelete = (id: string) => {
    deleteTodo(id).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error deleting todo");
      }
      setTodos(data.todos);
    });
  }


  const handleUpdate = (todo: ITodo) => {
    updateTodo(todo).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error updating todo");
      }
      setTodos(data.todos);
    })
  }



  return (
    <main className="App">
      <AddTodo saveTodo={handleAdd}></AddTodo>
      {
        todos.map(todo => <Todo key={todo._id} todo={todo} updateTodo={handleUpdate} deleteTodo={handleDelete}></Todo>)
      }
    </main>
  );
}

export default App;
