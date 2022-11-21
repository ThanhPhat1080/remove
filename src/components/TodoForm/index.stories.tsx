// Lib
import { Story } from '@storybook/react';

// Components
import TodoForm, { TodoFormProps } from '@components/TodoForm';
import BodyContent from '@components/BodyContent';

export default {
  title: 'TodoForm',
  component: TodoForm,
};

export const TodoFormSample: Story<TodoFormProps> = () => (
  <BodyContent>
    <TodoForm onAddTodo={() => {}} />
  </BodyContent>
);
