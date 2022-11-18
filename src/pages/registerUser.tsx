// Lib
import { FormEvent, useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Components
import UserForm from '@components/UserForm';
import Popup from '@components/Popup';

// Types
import { IUser } from 'types/user';

// Services
import { addUser } from '@service/userService';

// Constants
import { USER_ENDPOINT } from '@constants/endPoints';
import { formValidate } from '@helpers/validation';
import { SERVER_ERROR } from '@constants/errorMessage';

// Contexts
import { UserContext } from '@contexts/userContext';

// Reducers
import { UserAction } from '@reducers/userReducer';

const enum Variant {
  SUCCESS = 'bg-success',
  ERROR = 'bg-error',
}

const RegisterUser = () => {
  const { users, dispatch } = useContext(UserContext);

  /**
   * varian: background color notification
   * message: message notification
   * isOpen: open modal notification
   */
  const [variant, setVariant] = useState<Variant>(Variant.SUCCESS);
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = new Date().toJSON();
    const name = (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const avatar = (event.currentTarget.elements.namedItem('avatar') as HTMLInputElement).value;

    const user: IUser = { id, name, avatar };

    // Validate user
    const { isValid, errors } = formValidate(user);

    // Check validate if pass then create user, display notification success
    if (isValid) {
      return (
        handleCreateUser(user),
        setMessage('Add user successfully!'),
        setVariant(Variant.SUCCESS),
        setIsOpen(true),
        setTimeout(() => {
          navigate('/');
        }, 2000)
      );
    }

    // Check validate if error then create user, display notification error
    errors?.name ? setMessage(errors?.name) : errors?.avatar && setMessage(errors?.avatar);
    setVariant(Variant.ERROR);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const handleCreateUser = async (user: IUser) => {
    try {
      const response = await addUser(user, USER_ENDPOINT);

      if (response) {
        dispatch({
          action: UserAction.CREATE_USER_SUCCESS,
          payload: { ...user },
        });
      }
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  return (
    <div>
      {isOpen && <Popup isOpen={isOpen} variant={variant} message={message} />}
      <UserForm onRegisterUser={validateUser} />
    </div>
  );
};

export default RegisterUser;
