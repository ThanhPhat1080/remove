// Lib
import { render, screen } from '@testing-library/react';

// Components
import Sidebar, { SidebarProps } from '@components/Sidebar';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';

describe('Test Sidebar component', () => {
  const initSidebar: SidebarProps = {
    // @ts-ignore
    users: mockDataUser,
  };

  test('It should match DOM Snapshot', () => {
    const { container } = render(<Sidebar {...initSidebar} />);

    expect(container).toMatchSnapshot();
  });

  test('It should match data for Sidebar component', () => {
    render(<Sidebar {...initSidebar} />);

    expect(screen.getAllByRole('img')[0].getAttribute('src')).toEqual(
      'https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg',
    );

    expect(screen.getAllByRole('link')[0].textContent).toEqual('user1');
  });
});
