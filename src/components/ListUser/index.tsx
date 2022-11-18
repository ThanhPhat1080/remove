// Lib
import { useContext, useState } from 'react';

// Types
import { IUser } from 'types/user';

// Components
import User from '@components/User';

// Contexts
import { UserContext } from '@contexts/userContext';

// Reducers
import { UserAction } from '@reducers/userReducer';

export type ListUserProps = {
  listUser: IUser[];
  onRemoveUser: (id: string, name: string) => void;
};

const ListUser = ({ listUser, onRemoveUser }: ListUserProps) => {
  const { users, dispatch: dispatchUser, selectingUserId } = useContext(UserContext);

  const handleGetSelectingUserId = (idSelected: string) => {
    dispatchUser({
      action: UserAction.SELECTING_USER_ID,
      payload: idSelected,
    });
  };

  return (
    <ul className='user-list'>
      {listUser.map(({ id, avatar, name }) => (
        <User
          className={id === selectingUserId ? 'user-item user-selected' : 'user-item'}
          onSelectedUserId={handleGetSelectingUserId}
          onRemoveUser={onRemoveUser}
          key={id}
          id={id}
          name={name}
          avatar={avatar}
        />
      ))}
    </ul>
  );
};

export default ListUser;
