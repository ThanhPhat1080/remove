// Lib
import { FormEvent, useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Components
import UserForm from '@components/UserForm';

// Types
import { IUser } from 'types/user';

// Services
import { addUser } from '@service/userService';

// Constants
import { USER_ENDPOINT } from '@constants/endPoints';
import { formValidate } from '@helpers/validation';

// Contexts
import { UserContext } from '@contexts/userContext';

// Reducers
import { UserAction } from '@reducers/userReducer';
import { Path } from '@constants/paths';
import { generationId } from '@helpers/generationId';

const RegisterUser = () => {
  const { dispatch } = useContext(UserContext);

  const navigate: NavigateFunction = useNavigate();

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = generationId();
    const name = (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const avatar = (event.currentTarget.elements.namedItem('avatar') as HTMLInputElement).value;

    const user: IUser = { id, name, avatar };

    // Validate user
    const { isValid, errors } = formValidate(user);

    // Check validate if pass then create user, display notification success
    if (isValid) {
      handleCreateUser(user);
      (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value = '';
      (event.currentTarget.elements.namedItem('avatar') as HTMLInputElement).value = '';
    }

    // Check validate if error then create user, display notification error
    errors?.name ? alert(errors?.name) : errors?.avatar && alert(errors?.avatar);
  };

  // Create user
  const handleCreateUser = async (user: IUser) => {
    try {
      dispatch({
        action: UserAction.CREATE_USER,
        payload: { ...user },
      });

      await addUser(user, USER_ENDPOINT);

      if (window.confirm('Create user success. Navigate to Home page now')) {
        navigate(`${Path.HOME}${user.id}`);
      }
    } catch {
      alert(`Error when create user item: ${user.name}`);
      dispatch({
        action: UserAction.CREATE_USER_FAILED,
        payload: { ...user },
      });
    }
  };

  return (
    <div>
      <UserForm onRegisterUser={validateUser} />
    </div>
  );
};

export default RegisterUser;
