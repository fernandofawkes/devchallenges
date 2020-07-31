import React, { useState } from 'react';
import styled from 'styled-components';

const TodoItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const CheckLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: start;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  
  display: flex;
  justify-content: space-between;
  align-items:center;

  --checked-state-bg-color: #6DA6F2;
  --checked-state-check-color: #fff;
  --outline-color: var(--checked-state-bg-color);
  --outline-offset: 2px;

  & input[type="checkbox"] {
    /* remove the checkbox from the page flow, positioning it on top of the SVG */
    position: absolute;
    /* set same dimensions as the SVG */
    width: 1em;
    height: 1em;
    /* hide it */
    opacity: 0;
  }

  svg {
    /* set SVG dimensions in ems; i.e. relative to the font size so that it scales with the size of the font. */
    width: 1em;
    height: 1em;
    
    margin-right: 0.5em;
    margin-top: .1em;
  
    /* apply a transition to the elements inside the svg */
    * {
      transition: all 0.1s linear;
    }
  }
  input[type="checkbox"]:checked + svg {
    .cb-bg {
      fill: var(--checked-state-bg-color);
      stroke: var(--checked-state-bg-color);
    }
  
    .cb-cm {
      stroke: var(--checked-state-check-color);
    }
  }
  input[type="checkbox"]:checked ~ .todo__text {
    text-decoration: line-through;
    color: #BDBDBD;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #BDBDBD;
`;


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
    <TodoItem>
      <CheckLabel>
        <input type="checkbox" checked={checkedState} onChange={handleCheckChange} />
        <svg width="32" height="32" viewBox="-4 -4 39 39" aria-hidden="true" focusable="false">
            <rect className="cb-bg" width="35" height="35" x="-2" y="-2" stroke="currentColor" fill="none" strokeWidth="3"
                rx="6" ry="6"></rect>
            <polyline className="cb-cm" points="4,14 12,23 28,5" stroke="transparent" strokeWidth="4" fill="none"></polyline>
        </svg>
        <div className="todo__text">
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      </CheckLabel>
      <DeleteButton onClick={() => deleteTodo(todo._id)}>
        <i className="material-icons">delete_outline</i>
      </DeleteButton>
    </TodoItem>
  );
}

export default Todo;