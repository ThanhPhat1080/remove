// Types
import { ITodo } from 'types/todo';

// Components
import TodoItem from '@components/TodoItem';

export type ListTodoProps = {
  todos: ITodo[];
  onRemoveTodo: (id: string) => void;
  onCheckDoneTodo: (id: string) => void;
};

const ListTodo = ({ todos, onRemoveTodo, onCheckDoneTodo }: ListTodoProps) => {
  return (
    <ul className='list-todo'>
      {todos.map((item) => (
        <TodoItem
          onCheckDoneTodo={onCheckDoneTodo}
          onRemoveTodo={onRemoveTodo}
          key={item.id}
          id={item.id}
          task={item.task}
          status={item.status}
        />
      ))}
    </ul>
  );
};

export default ListTodo;
