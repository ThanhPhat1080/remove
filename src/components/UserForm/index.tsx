// Lib
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
          minLength={6}
        />
      </div>
      <div className='button-wrapper'>
        <Link className='btn-secondary cancel' to='/'>
          Cancel
        </Link>
        <button type='submit' className='btn-success'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
