// Lib
import { Story } from '@storybook/react';

// Components
import UserForm, { UserFormProps } from '@components/UserForm';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'UserForm',
  component: UserForm,
};

export const UserFormSample: Story<UserFormProps> = () => (
  <BrowserRouter>
    <UserForm onRegisterUser={() => {}} />
  </BrowserRouter>
);
