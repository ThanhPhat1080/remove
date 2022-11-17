// Lib
import { Link } from 'react-router-dom';

// Components
import ListUser from '@components/ListUser';
import Sidebar from '@components/Sidebar';

// Types
import { IUser } from 'types/user';

export type UserSidebarProps = {
  users: IUser[];
// @ts-ignore
onRemoveUser: (id: string) => void;
};

const UserSidebar = ({ users, onRemoveUser }: UserSidebarProps) => {
  return (
    <Sidebar>
      <h2 className='title sidebar-title'>List User</h2>
      <ListUser onRemoveUser={onRemoveUser} listUser={users} />
      <Link to={'/register'}>
        <button className='button'>New user</button>
      </Link>
    </Sidebar>
  );
};

export default UserSidebar;
