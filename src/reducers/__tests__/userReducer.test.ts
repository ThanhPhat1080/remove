// Reducers
import { UserAction, userReducer } from '@reducers/userReducer';

// Types
import { IDataUser } from 'types/dataType';
import { IUser } from 'types/user';

describe('Test user reducer', () => {
  const users: IUser[] = [
    {
      id: '2022-11-13T13:29:39.860Z',
      name: 'Slack',
      avatar: 'avatar',
    },
    {
      id: 'n153h',
      name: 'thong',
      avatar: 'avatar2',
    },
  ];

  const mockDataUser: IUser = {
    id: 'n153h33',
    name: 'user1',
    avatar: 'avatar3',
  };

  const dataUser: IDataUser = {
    users: users,
  };

  test('Action get user', () => {
    const updateAction = {
      action: UserAction.GET_USER,
      payload: users,
    };

    const updatedState = userReducer(dataUser, updateAction);
    expect(updatedState).toEqual({
      users: [
        { id: '2022-11-13T13:29:39.860Z', name: 'Slack', avatar: 'avatar' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
      ],
    });
  });

  test('Action add user failed', () => {
    const updateAction = {
      action: UserAction.CREATE_USER_FAILED,
      payload: mockDataUser,
    };

    const updatedState = userReducer(dataUser, updateAction);
    expect(updatedState).toEqual({
      isActionUserError: true,
      userErrorMessage: 'Add user error',
      users: [
        { id: '2022-11-13T13:29:39.860Z', name: 'Slack', avatar: 'avatar' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
      ],
    });
  });

  test('Action add user', () => {
    const updateAction = {
      action: UserAction.CREATE_USER,
      payload: mockDataUser,
    };

    const updatedState = userReducer(dataUser, updateAction);
    expect(updatedState).toEqual({
      users: [
        { id: '2022-11-13T13:29:39.860Z', name: 'Slack', avatar: 'avatar' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
        { id: 'n153h33', name: 'user1', avatar: 'avatar3' },
      ],
    });
  });

  test('Action delete user', () => {
    const updateAction = {
      action: UserAction.DELETE_USER,
      payload: users[0],
    };

    const updatedState = userReducer(dataUser, updateAction);
    expect(updatedState).toEqual({
      users: [{ id: 'n153h', name: 'thong', avatar: 'avatar2' }],
    });
  });

  test('Action delete user failed', () => {
    const updateAction = {
      action: UserAction.DELETE_USER_FAILED,
      payload: users[1],
    };

    const updatedState = userReducer(dataUser, updateAction);

    expect(updatedState).toEqual({
      isActionUserError: true,
      userErrorMessage: 'Delete user error',
      users: [
        { id: '2022-11-13T13:29:39.860Z', name: 'Slack', avatar: 'avatar' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
      ],
    });
  });

  test('It should render default user', () => {
    const updateAction = {
      action: 'demo' as UserAction,
      payload: users,
    };

    const updatedState = userReducer(dataUser, updateAction);
    expect(updatedState).toEqual({
      users: [
        { id: '2022-11-13T13:29:39.860Z', name: 'Slack', avatar: 'avatar' },
        { id: 'n153h', name: 'thong', avatar: 'avatar2' },
      ],
    });
  });
});
