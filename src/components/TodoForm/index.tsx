// Lib
import { FormEvent } from 'react';

// Assets
import { iconAdd } from '@assets';

// Component
import Input from '@components/Input';

export type TodoFormProps = {
  onAddTodo: (event: FormEvent<HTMLFormElement>) => void;
};

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  return (
    <>
      <h1 className='title todo-title'>todos</h1>
      <form data-testid='form-todo' method='post' onSubmit={onAddTodo}>
        <div className='add-todo'>
          <Input
            size='input-lg'
            id='task'
            name='task'
            placeholder='Add new todo'
            defaultValue=''
            label=''
            isRequired={true}
          />
          <button className='add-button'>
            <img className='add-icon' src={iconAdd} alt='add-todo' />
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
