import React, { useState } from 'react';
import styled from 'styled-components';


const TodoForm = styled.form`
  margin: 18px 0 32px 0;
  display: flex;
`;

const SubmitButton = styled.button`
  background: #6DA6F2;
  box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
  border-radius: 12px;
  padding: 20px 40px;
  font-size: 14px;
  line-height: 17px;
  border: 0;
  color: #fff;
  margin-left: 25px;
`;

const InputField = styled.input`
  flex: 1;  
  border: 1px solid #BDBDBD;
  padding: 20px 12px;
  font-size: 14px;
  line-height: 17px;
  &:first-of-type  {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  & + & {
    border-left: 0;
  }
  &:last-of-type  {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  } 
`;

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
    <TodoForm onSubmit={handleSubmit}>
      <InputField type="text" onChange={handleFormData} value={formData.name} id="name" placeholder="name" />
      <InputField type="text" onChange={handleFormData} value={formData.description} id="description" placeholder="description" />
      <SubmitButton type="submit" disabled={!formData}>Add</SubmitButton>
    </TodoForm>
  );
}

export default AddTodo;