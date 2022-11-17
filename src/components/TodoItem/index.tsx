// Assets
import { iconDelete } from '@assets';

export type TodoItemProps = {
  id: string;
  task: string;
  status: boolean;
  onRemoveTodo: (id: string) => void;
  onCheckDoneTodo: (id: string) => void;
};

const TodoItem = ({ id, task, status = false, onRemoveTodo, onCheckDoneTodo }: TodoItemProps) => {
  const handleRemoveTodo = () => {
    onRemoveTodo(id);
  };

  const handleCheckDoneTodo = () => {
    onCheckDoneTodo(id);
  };

  return (
    <li className='todo-item'>
      <div className='round'>
        <input checked={status} type='checkbox' />
        <label onClick={handleCheckDoneTodo} htmlFor='checkbox' />
      </div>
      <p className='todo-task'>{status ? <s>{task}</s> : task}</p>
      <img src={iconDelete} alt='delete' className='icon' onClick={handleRemoveTodo} />
    </li>
  );
};

export default TodoItem;
