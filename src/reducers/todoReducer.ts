// Types
import { ITodo } from 'types/todo';
import { IDataTodo } from 'types/dataType';

export enum TodoAction {
  GET_TODO = 'GET_TODO',
  CREATE_TODO = 'CREATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CHECK_DONE_TODO = 'CHECK_DONE_TODO',
  CREATE_TODO_FAILED = 'CREATE_TODO_FAILED',
  DELETE_TODO_FAILED = 'DELETE_TODO_FAILED',
  CHECK_DONE_TODO_FAILED = 'CHECK_DONE_TODO_FAILED',
}

export type DataPayload = ITodo[] | string | ITodo;

export interface DataAction {
  action: TodoAction;
  payload: DataPayload;
}

const todoReducer = (state: IDataTodo, actions: DataAction): IDataTodo => {
  const { action, payload } = actions;
  switch (action) {
    case TodoAction.GET_TODO: {
      const listTodo = payload as ITodo[];
      return { ...state, todos: listTodo };
    }
    case TodoAction.CREATE_TODO: {
      const listTodoUpdate = state.todos.concat(payload as ITodo);
      return { ...state.todos, todos: listTodoUpdate };
    }
    case TodoAction.CREATE_TODO_FAILED: {
      const todo = payload as ITodo;
      const listTodoUpdate = state.todos.filter((item) => item.id != todo.id);
      return {
        ...state,
        todos: listTodoUpdate,
        isActionTodoError: true,
        todoErrorMessage: 'Add todo error',
      };
    }
    case TodoAction.DELETE_TODO: {
      const todo = payload as ITodo;
      const listTodoUpdate = state.todos.filter((item) => item.id != todo.id);
      return { ...state, todos: listTodoUpdate };
    }
    case TodoAction.DELETE_TODO_FAILED: {
      const todo = payload as ITodo;
      return {
        ...state,
        todos: [...state.todos, todo],
        isActionTodoError: true,
        todoErrorMessage: 'Delete todo error',
      };
    }
    case TodoAction.CHECK_DONE_TODO: {
      const todo = payload as ITodo;
      const listTodoUpdate: ITodo[] = state.todos.map((item) => {
        if (item.id === todo.id) {
          return todo;
        }

        return item;
      });

      return { ...state, todos: listTodoUpdate };
    }
    case TodoAction.CHECK_DONE_TODO_FAILED: {
      const todo = payload as ITodo;
      const listTodoUpdate = state.todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, status: !todo.status };
        }

        return item;
      });

      return {
        ...state,
        todos: listTodoUpdate,
        isActionTodoError: true,
        todoErrorMessage: 'Check done todo error',
      };
    }
    default: {
      return state;
    }
  }
};

export { todoReducer };
