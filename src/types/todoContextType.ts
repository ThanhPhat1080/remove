// Types
import { ITodo } from './todo';

export interface ITodoContext {
  todos: ITodo[];
  dispatch: Function;
}
