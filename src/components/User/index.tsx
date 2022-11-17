// Assets
import { iconDelete } from '@assets';

export type UserProps = {
  id: string;
  avatar: string;
  name: string;
  className: string;
  onRemoveUser: (id: string) => void;
  onSelectedUserId: (id: string) => void;
};

const User = ({ id, name, avatar, className, onRemoveUser, onSelectedUserId }: UserProps) => {
  const handleRemoveUser = () => {
    onRemoveUser(id);
  };

  const handleGetSelectingUserId = () => {
    onSelectedUserId(id);
  };

  return (
    <li onClick={handleGetSelectingUserId} className={className}>
      <img src={avatar} alt='Avatar' className='avatar' />
      <a className='link' href='#'>
        {name}
      </a>
      <img
        src={iconDelete}
        onClick={handleRemoveUser}
        alt='user name'
        className='icon icon-delete'
      />
    </li>
  );
};

export default User;
