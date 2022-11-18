// Lib
import { Link } from 'react-router-dom';

// Components
import ListUser from '@components/ListUser';
import Sidebar from '@components/Sidebar';

// Types
import { IUser } from 'types/user';

export type UserSidebarProps = {
  users: IUser[];
  isRemovingUser: boolean;
  onRemoveUser: (id: string, name: string) => void;
};

const UserSidebar = ({ users, onRemoveUser, isRemovingUser }: UserSidebarProps) => {
  return (
    <Sidebar>
      <h2 className='title sidebar-title'>List User</h2>
      {isRemovingUser && <div className='loading'>Loading...</div>}
      <ListUser onRemoveUser={onRemoveUser} listUser={users} />
      <Link to={'/register'}>
        <button className='button'>New user</button>
      </Link>
    </Sidebar>
  );
};

export default UserSidebar;
