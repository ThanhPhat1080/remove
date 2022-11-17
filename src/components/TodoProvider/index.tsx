// Lib
import { useReducer } from 'react';

// Contexts
import { TodoContext } from '@contexts/todoContext';

// Reducers
import { todoReducer } from '@reducers/todoReducer';

// Types
import { IDataTodo } from 'types/dataType';

const initialState: IDataTodo = {
  todos: [],
};

export const TodoProvider: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const { todos } = state;

  const value = {
    todos,
    dispatch,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
