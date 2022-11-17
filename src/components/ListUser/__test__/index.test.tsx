// Lib
import { render, screen } from '@testing-library/react';

// Components
import ListUser, { ListUserProps } from '@components/ListUser';

// Mocks
import { mockDataUser } from '@mocks/mockDataUser';

describe('Test ListUser component', () => {
  const initListUser: ListUserProps = {
    // @ts-ignore
    users: mockDataUser,
  };

  test('It should match DOM Snapshot', () => {
    const { container } = render(<ListUser {...initListUser} />);

    expect(container).toMatchSnapshot();
  });

  test('It should match data for ListUser component', () => {
    render(<ListUser {...initListUser} />);

    expect(screen.getAllByRole('img')[0].getAttribute('src')).toEqual(
      'https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg',
    );

    expect(screen.getAllByRole('link')[0].textContent).toEqual('user1');
  });
});
