import React, { useState, useEffect } from 'react';

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({todo, updateTodo, deleteTodo}) => {

  const [completed, setCompletion] = useState(todo.status);

  useEffect(() => {
    console.log('completion changed');

    updateTodo({
      ...todo,
      status: completed
    });

  }, [completed]);

  return (
    <li className="todo">
      <input type="checkbox" checked={completed} onChange={() => setCompletion(!completed)} />
      <div className="todo__text">
        <h1>{todo.name}</h1>
        <p>{todo.description}</p>
      </div>
      <button onClick={() => deleteTodo(todo._id)}>
        Delete
      </button>
    </li>
  );
}

export default Todo;