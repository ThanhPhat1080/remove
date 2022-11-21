// Lib
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import UserForm, { UserFormProps } from '@components/UserForm';

describe('Test UserForm component', () => {
  const initUserForm: UserFormProps = {
    onRegisterUser: jest.fn(),
  };

  test('It should render correctly with initial Props', () => {
    const { container } = render(
      <BrowserRouter>
        <UserForm {...initUserForm} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  test('It should call on register user', () => {
    render(
      <BrowserRouter>
        <UserForm {...initUserForm} />
      </BrowserRouter>,
    );
    // render(<UserForm {...initUserForm} />, { wrapper: BrowserRouter });
    fireEvent.submit(screen.getByTestId('user-form'));

    expect(initUserForm.onRegisterUser).toHaveBeenCalledTimes(1);
  });
});
