import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { getTodos } from './API';

const App: React.FC = () =>  {
  const [todos, setTodos] = useState<ITodo[]>([]);

  // useEffect with no dependencies run on mount and dismisses on unmount 
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos().then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err));
  };

  return (
    <main className="App">
    <AddTodo saveTodo={() => {}} ></AddTodo>
    {
      todos.map(todo => <Todo key={todo._id} todo={todo} updateTodo={() => {}} deleteTodo={() => {}}></Todo>)
    }
    </main>
  );
}

export default App;
