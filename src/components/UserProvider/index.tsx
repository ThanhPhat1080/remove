// Lib
import { useReducer } from 'react';

// Reducers
import { userReducer } from '@reducers/userReducer';

// Types
import { IDataUser } from 'types/dataType';

// Contexts
import { UserContext } from '@contexts/userContext';

const initialState: IDataUser = {
  users: [],
  selectingUserId: '',
};

export const UserProvider: React.FC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { users, selectingUserId } = state;

  const value = {
    users,
    selectingUserId,
    dispatch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
