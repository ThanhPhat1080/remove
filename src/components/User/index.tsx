// Lib
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Assets
import { iconDelete } from '@assets';

export type UserProps = {
  id: string;
  avatar: string;
  name: string;
  className: string;
  onRemoveUser: (id: string, name: string) => void;
};

const User = ({ id, name, avatar, className, onRemoveUser }: UserProps) => {
  const navigate: NavigateFunction = useNavigate();

  const handleRemoveUser = () => {
    onRemoveUser(id, name);
  };

  const navigateUserSelected = () => {
    navigate(`/${id}`);
  };

  return (
    <li className={className} onClick={navigateUserSelected} data-testid='selected-id-user'>
      <img src={avatar} alt='Avatar' className='avatar' />
      {name}
      <img
        src={iconDelete}
        onClick={handleRemoveUser}
        alt='user name'
        className='icon icon-delete'
        data-testid='delete-user'
      />
    </li>
  );
};

export default User;
