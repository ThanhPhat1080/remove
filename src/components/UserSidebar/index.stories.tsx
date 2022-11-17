// Lib
import { Story } from '@storybook/react';

// Components
import UserSidebar, { UserSidebarProps } from '@components/UserSidebar';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';

export default {
  title: 'UserSidebar',
  component: UserSidebar,
};

export const Sample: Story<UserSidebarProps> = () => <UserSidebar users={mockDataUser} onRemoveUser={() => {}} />;
