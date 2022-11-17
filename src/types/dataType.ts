// Types
import { ITodo } from './todo';
import { IUser } from './user';

export interface IDataUser {
  users: IUser[];
  selectingUserId?: string;
}

export interface IDataTodo {
  todos: ITodo[];
}
