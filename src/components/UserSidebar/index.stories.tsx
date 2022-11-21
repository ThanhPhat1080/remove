// Lib
import { Story } from '@storybook/react';

// Components
import UserSidebar, { UserSidebarProps } from '@components/UserSidebar';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'UserSidebar',
  component: UserSidebar,
};

export const Sample: Story<UserSidebarProps> = () => (
  <BrowserRouter>
    <UserSidebar users={mockDataUser} onRemoveUser={() => {}} isRemovingUser={false} />
  </BrowserRouter>
);
