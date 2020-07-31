import React, { useState } from 'react';

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({todo, updateTodo, deleteTodo}) => {
  const [checkedState, setCheckedState] = useState(todo.status);

  const handleCheckChange = () => {
    const newState = !checkedState;
    setCheckedState(newState);
    updateTodo({
      ...todo,
      status: newState
    })
  }
  
  return (
    <li className="todo">
      <input type="checkbox" checked={checkedState} onChange={handleCheckChange} />
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