// Lib
import { Story } from '@storybook/react';

// Components
import ListUser, { ListUserProps } from '@components/ListUser';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';

export default {
  title: 'ListUser',
  component: ListUser,
};

export const ListUserSample: Story<ListUserProps> = () => <ListUser listUser={mockDataUser} onRemoveUser={() => {}} />;
