// Lib
import { Story } from '@storybook/react';

// Components
import ListTodo, { ListTodoProps } from '@components/ListTodo';
import { mockDataTodo } from '@mocks/mockDataTodo';

export default {
  title: 'ListTodo',
  component: ListTodo,
};

const Template: Story<ListTodoProps> = (args) => <ListTodo {...args} />;

export const ListTodoSample = Template.bind({});
ListTodoSample.args = {
  todos: mockDataTodo,
  onRemoveTodo: () => {},
  onCheckDoneTodo: () => {},
};
