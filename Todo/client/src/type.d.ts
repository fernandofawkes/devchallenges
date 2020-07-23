// data from api
interface ITodo {
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

//api responses
type APIDataType =  {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}

interface TodoProps {
  todo: ITodo
}