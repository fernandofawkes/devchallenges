import React, { useState } from 'react';

type Props = {
  saveTodo: (event: React.FormEvent, todo: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<Pick<ITodo, 'name' | 'description'>>({
    name: '', description: ''
  });

  const handleFormData: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
    const fieldName = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    saveTodo(e, formData);
    setFormData({
      name: '', description: ''
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleFormData} value={formData.name} id="name" />
      <input type="text" onChange={handleFormData} value={formData.description} id="description" />
      <button type="submit" disabled={!formData}>Add</button>
    </form>
  );
}

export default AddTodo;