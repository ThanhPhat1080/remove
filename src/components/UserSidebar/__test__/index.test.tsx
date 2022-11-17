// Lib
import { render, screen } from '@testing-library/react';

// Components
import UserSidebar, { UserSidebarProps } from '@components/UserSidebar';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';

describe('Test UserSidebar component', () => {
// @ts-ignore
  const initUserSidebar: UserSidebarProps = {
    users: mockDataUser,
  };

  test('It should match DOM Snapshot', () => {
    const { container } = render(<UserSidebar {...initUserSidebar} />);

    expect(container).toMatchSnapshot();
  });

  test('It should match data for UserSidebar component', () => {
    render(<UserSidebar {...initUserSidebar} />);

    expect(screen.getAllByRole('img')[0].getAttribute('src')).toEqual(
      'https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg',
    );

    expect(screen.getAllByRole('link')[0].textContent).toEqual('user1');
  });
});
