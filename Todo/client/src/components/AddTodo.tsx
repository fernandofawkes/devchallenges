import React, { useState } from 'react';

type Props = {
  saveTodo: (event: React.FormEvent, todo: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({saveTodo}) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleFormData: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
    const fieldName = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;
    setFormData({...formData, [fieldName]: fieldValue});
  }

  return (
    <form onSubmit={(e) => saveTodo(e, formData)}>
      <input type="text" onChange={handleFormData} id="name" />
      <input type="text" onChange={handleFormData} id="description" />
      <button type="submit" disabled={!formData}>Add</button>
    </form>
  );
}

export default AddTodo;