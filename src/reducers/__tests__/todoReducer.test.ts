// Reducers
import { TodoAction, todoReducer } from '@reducers/todoReducer';

// Types
import { IDataTodo } from 'types/dataType';
import { ITodo } from 'types/todo';

describe('Test todo reducer', () => {
  const todos: ITodo[] = [
    {
      id: '1',
      task: 'todo',
      status: false,
      idUser: '1',
    },
    {
      id: '2',
      task: 'task',
      status: true,
      idUser: '2',
    },
  ];

  const mockDataTodo: ITodo = {
    id: '3',
    task: 'doing',
    status: false,
    idUser: '1',
  };

  const dataTodo: IDataTodo = {
    todos: todos,
  };

  test('Action get todo', () => {
    const updateAction = {
      action: TodoAction.GET_TODO,
      payload: todos,
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });

  test('Action add todo failed', () => {
    const updateAction = {
      action: TodoAction.CREATE_TODO_FAILED,
      payload: mockDataTodo,
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      isActionTodoError: true,
      todoErrorMessage: 'Add todo error',
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });

  test('Action add todo', () => {
    const updateAction = {
      action: TodoAction.CREATE_TODO,
      payload: mockDataTodo,
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
        { id: '3', task: 'doing', status: false, idUser: '1' },
      ],
    });
  });

  test('Action delete todo failed', () => {
    const updateAction = {
      action: TodoAction.DELETE_TODO_FAILED,
      payload: todos[1],
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      isActionTodoError: true,
      todoErrorMessage: 'Delete todo error',
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });

  test('Action delete todo', () => {
    const updateAction = {
      action: TodoAction.DELETE_TODO,
      payload: todos[0],
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      todos: [{ id: '2', task: 'task', status: true, idUser: '2' }],
    });
  });

  test('Action check done todo', () => {
    const updateAction = {
      action: TodoAction.CHECK_DONE_TODO,
      payload: todos[0],
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });

  test('Action check done todo failed', () => {
    const updateAction = {
      action: TodoAction.CHECK_DONE_TODO_FAILED,
      payload: todos[0],
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      isActionTodoError: true,
      todoErrorMessage: 'Check done todo error',
      todos: [
        { id: '1', task: 'todo', status: true, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });

  test('It should render default todo', () => {
    const updateAction = {
      action: 'demo' as TodoAction,
      payload: todos,
    };

    const updatedState = todoReducer(dataTodo, updateAction);
    expect(updatedState).toEqual({
      todos: [
        { id: '1', task: 'todo', status: false, idUser: '1' },
        { id: '2', task: 'task', status: true, idUser: '2' },
      ],
    });
  });
});
