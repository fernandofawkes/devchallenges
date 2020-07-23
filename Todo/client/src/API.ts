import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:4000";

export const getTodos = async (): Promise<AxiosResponse<APIDataType>> => {
  try {
    const todos = await axios.get<APIDataType>(baseUrl + "/todos");
    return todos;
  } catch (error) {
    throw new Error(error);
  }
}

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<APIDataType>> => {
  try {
    // removing _id property from type, mongoose will generate it server side
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };

    const saveTodo = await axios.post<APIDataType>(baseUrl + "/todos/", todo);
    return saveTodo
  } catch (error) {
    throw new Error(error);
  }
}

export const updateTodo = async (formData: ITodo): Promise<AxiosResponse<APIDataType>> => {
  try {
    // we can only modify the status property of an existing todo
    const todo: Pick<ITodo, 'status'> = {
      status: formData.status
    };

    const modifiedTodo = await axios.put<APIDataType>(baseUrl + '/todos/' + formData._id, todo);
    return modifiedTodo;
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteTodo = async (formData: ITodo): Promise<AxiosResponse<APIDataType>> => {
  try {
    const deletedTodo = await axios.delete<APIDataType>(baseUrl + '/todos/' + formData._id);
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
}