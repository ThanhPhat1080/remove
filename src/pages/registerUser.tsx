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

// Contexts
import { UserContext } from '@contexts/userContext';

// Reducers
import { UserAction } from '@reducers/userReducer';
import { Path } from '@constants/paths';

const enum Variant {
  SUCCESS = 'bg-success',
  ERROR = 'bg-error',
}

const RegisterUser = () => {
  const { dispatch, userErrorMessage } = useContext(UserContext);

  /**
   * varian: background color notification
   * message: message notification
   * isOpen: open modal notification
   */
  const [variant, setVariant] = useState<Variant>(Variant.SUCCESS);
  const [message, setMessage] = useState<string>('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = (Math.random() + 1).toString(36).substring(7);
    const name = (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const avatar = (event.currentTarget.elements.namedItem('avatar') as HTMLInputElement).value;

    const user: IUser = { id, name, avatar };

    // Validate user
    const { isValid, errors } = formValidate(user);

    // Check validate if pass then create user, display notification success
    if (isValid) {
      handleCreateUser(user);
    }

    // Check validate if error then create user, display notification error
    errors?.name ? setMessage(errors?.name) : errors?.avatar && setMessage(errors?.avatar);
    setVariant(Variant.ERROR);
    setIsOpenPopup(true);
    setTimeout(() => {
      setIsOpenPopup(false);
    }, 3000);
  };

  // Create user
  const handleCreateUser = async (user: IUser) => {
    try {
      dispatch({
        action: UserAction.CREATE_USER,
        payload: { ...user },
      });

      await addUser(user, USER_ENDPOINT);
      setMessage('Add user successfully!'),
        setVariant(Variant.SUCCESS),
        setIsOpenPopup(true),
        setTimeout(() => {
          navigate(`${Path.DASHBOARD}${user.id}`);
        }, 2000);
    } catch {
      dispatch({
        action: UserAction.CREATE_USER_FAILED,
        payload: { ...user },
      });
    }
  };

  return (
    <div>
      {isOpenPopup && (
        <Popup isOpen={isOpenPopup} variant={variant} message={userErrorMessage || message} />
      )}
      <UserForm onRegisterUser={validateUser} />
    </div>
  );
};

export default RegisterUser;
