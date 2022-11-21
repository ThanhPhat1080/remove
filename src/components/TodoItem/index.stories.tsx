// Lib
import { Story } from '@storybook/react';

// Components
import TodoItem, { TodoItemProps } from '@components/TodoItem';

export default {
  title: 'TodoItem',
  component: TodoItem,
};

const Template: Story<TodoItemProps> = (args) => <TodoItem {...args} />;

export const TodoComplete = Template.bind({});
TodoComplete.args = {
  id: '1',
  task: 'todo',
  status: false,
  onRemoveTodo: (id: string) => {},
  onCheckDoneTodo: (id: string) => {},
};
