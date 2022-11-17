// Types
import { ITodo } from 'types/todo';
import { IDataTodo } from 'types/dataType';

export enum TodoAction {
  GET_TODO_SUCCESS = 'GET_TODO_SUCCESS',
  CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
  DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS',
  CHECK_DONE_TODO = 'CHECK_DONE_TODO',
}

export type DataPayload = ITodo[] | string | ITodo;

export interface DataAction {
  action: TodoAction;
  payload: DataPayload;
}

const todoReducer = (state: IDataTodo, actions: DataAction): IDataTodo => {
  const { action, payload } = actions;
  switch (action) {
    case TodoAction.GET_TODO_SUCCESS: {
      return { ...state, todos: payload as ITodo[] };
    }
    case TodoAction.CREATE_TODO_SUCCESS: {
      return { ...state.todos, todos: state.todos.concat(payload as ITodo) };
    }
    case TodoAction.DELETE_TODO_SUCCESS: {
      const deleteTodo = state.todos.filter((item) => item.id != payload);
      return { ...state, todos: deleteTodo };
    }
    case TodoAction.CHECK_DONE_TODO: {
      const listTodoUpdate = state.todos.map((item) => {
        if (item.id === payload) {
          return { ...item, status: !item.status };
        }

        return { ...item };
      });

      return { ...state, todos: listTodoUpdate };
    }
    default: {
      return { ...state };
    }
  }
};

export { todoReducer };
