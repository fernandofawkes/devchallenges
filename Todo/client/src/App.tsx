import React, { useState, useEffect, useCallback } from 'react';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { getTodos, deleteTodo, updateTodo, addTodo } from './API';

import styled from 'styled-components';
import FilterTodos, { TodoFilter } from './components/FilterTodos';
const TodoFilterEnum = TodoFilter;
const Heading = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  letter-spacing: -0.045em;
  color: #333333;
`;

const MainContent = styled.main`
  margin: auto;
  width: 100%;
  max-width: 480px; 
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

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
    });
  }


  const filterTodos = useCallback((filteredValue: TodoFilter) => {
    const filtered = todos.filter(todo => {
      return filteredValue !== TodoFilterEnum.All ? todo.status === !!filteredValue : true
    });
    
    setFilteredTodos(filtered);
  }, [todos]);

  return (
    <MainContent>
      <Heading>#todo</Heading>
      <AddTodo saveTodo={handleAdd}></AddTodo>
      <FilterTodos todos={todos} filterTodos={filterTodos}></FilterTodos>
      {
        filteredTodos.map(todo => <Todo key={todo._id} todo={todo} updateTodo={handleUpdate} deleteTodo={handleDelete}></Todo>)
      }
    </MainContent>
  );
}

export default App;
