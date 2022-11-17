// Types
import { IDataUser } from 'types/dataType';
import { IUser } from 'types/user';

export enum UserAction {
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  SELECTING_USER_ID = 'SELECTING_USER_ID',
}

export type DataPayload = IUser[] | string | IUser;

export interface DataAction {
  action: UserAction;
  payload: DataPayload;
}

const userReducer = (state: IDataUser, actions: DataAction): IDataUser => {
  const { action, payload } = actions;
  switch (action) {
    case UserAction.GET_USER_SUCCESS: {
      return { ...state, users: payload as IUser[] };
    }
    case UserAction.CREATE_USER_SUCCESS: {
      return { ...state.users, users: state.users.concat(payload as IUser) };
    }
    case UserAction.DELETE_USER_SUCCESS: {
      const deleteUser = state.users.filter((item) => item.id != payload);
      return { ...state, users: deleteUser };
    }
    case UserAction.SELECTING_USER_ID: {
      return { ...state, selectingUserId: payload as string };
    }
    default: {
      return { ...state };
    }
  }
};

export { userReducer };
