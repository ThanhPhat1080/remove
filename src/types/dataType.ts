// Types
import { ITodo } from './todo';
import { IUser } from './user';

export interface IDataUser {
  users: IUser[];
  isActionUserError?: boolean;
  userErrorMessage?: string;
}

export interface IDataTodo {
  todos: ITodo[];
  isActionTodoError?: boolean;
  todoErrorMessage?: string;
}
