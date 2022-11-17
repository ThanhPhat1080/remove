// Lib
import { FormEvent } from 'react';

// Components
import Input from '@components/Input';

export type UserFormProps = {
  onRegisterUser: (event: FormEvent<HTMLFormElement>) => void;
};

const UserForm = ({ onRegisterUser }: UserFormProps) => {
  return (
    <form method='post' className='user-form' onSubmit={onRegisterUser}>
      <h2 className='title'>Create new user</h2>
      <div className='user-name'>
        <Input id='name' name='name' label='Name' placeholder='Enter name' />
      </div>
      <div className='avatar-url'>
        <Input
          id='avatar'
          type='url'
          name='avatar'
          label='Avatar'
          placeholder='Enter link avatar'
        />
      </div>
      <div className='button-wrapper'>
        <button className='btn-secondary cancel'>Cancel</button>
        <button type='submit' className='btn-success'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
