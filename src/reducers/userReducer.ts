// Types
import { IDataUser } from 'types/dataType';
import { IUser } from 'types/user';

export enum UserAction {
  GET_USER = 'GET_USER',
  CREATE_USER = 'CREATE_USER',
  DELETE_USER = 'DELETE_USER',
  CREATE_USER_FAILED = 'CREATE_USER_FAILED',
  DELETE_USER_FAILED = 'DELETE_USER_FAILED',
}

export type DataPayload = IUser[] | string | IUser;

export interface DataAction {
  action: UserAction;
  payload: DataPayload;
}

const userReducer = (state: IDataUser, actions: DataAction): IDataUser => {
  const { action, payload } = actions;
  switch (action) {
    case UserAction.GET_USER: {
      return { ...state, users: payload as IUser[] };
    }
    case UserAction.CREATE_USER: {
      return { ...state.users, users: state.users.concat(payload as IUser) };
    }
    case UserAction.CREATE_USER_FAILED: {
      const user = payload as IUser;
      const listUserUpdate = state.users.filter((item) => item.id !== user.id);
      return {
        ...state,
        users: listUserUpdate,
        isActionUserError: true,
        userErrorMessage: 'Add user error',
      };
    }
    case UserAction.DELETE_USER: {
      const user = payload as IUser;
      const deleteUser = state.users.filter((item) => item.id != user.id);
      return { ...state, users: deleteUser };
    }
    case UserAction.DELETE_USER_FAILED: {
      const user = payload as IUser;

      return {
        ...state,
        users: [...state.users, user],
        isActionUserError: true,
        userErrorMessage: 'Delete user error',
      };
    }
    default: {
      return { ...state };
    }
  }
};

export { userReducer };
