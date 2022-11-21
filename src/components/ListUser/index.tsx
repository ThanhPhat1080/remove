// Lib
import { useParams } from 'react-router-dom';

// Types
import { IUser } from 'types/user';

// Components
import User from '@components/User';

export type ListUserProps = {
  listUser: IUser[];
  onRemoveUser: (id: string, name: string) => void;
};

const ListUser = ({ listUser, onRemoveUser }: ListUserProps) => {
  const { selectingUserId } = useParams();

  return (
    <ul className='user-list'>
      {listUser &&
        listUser.map(({ id, avatar, name }) => (
          <User
            className={id === selectingUserId ? 'user-item user-selected' : 'user-item'}
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
