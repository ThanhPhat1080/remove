// Lib
import { FormEvent, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import BodyContent from '@components/BodyContent';
import ListTodo from '@components/ListTodo';
import TodoForm from '@components/TodoForm';
import UserSidebar from '@components/UserSidebar';

// Types
import { IUser } from 'types/user';
import { ITodo } from 'types/todo';

// Constants
import { TODO_ENDPOINT, USER_ENDPOINT } from '@constants/endPoints';
import { Path } from '@constants/paths';

// Helpers
import { fetcher } from '@helpers/fetcher';

// Contexts
import { TodoContext } from '@contexts/todoContext';
import { UserContext } from '@contexts/userContext';

// Reducers
import { UserAction } from '@reducers/userReducer';
import { TodoAction } from '@reducers/todoReducer';

// Service
import { addTodo, checkDoneTodo, removeTodo } from '@service/todoService';
import { removeUser } from '@service/userService';
import { generationId } from '@helpers/generationId';

const Home = () => {
  // Using useParam get id in url
  const { selectingUserId } = useParams();

  // Loading indicator
  const [isRemovingUser, setRemovingUser] = useState(false);
  const [isProcessingTodoList, setProcessingTodoList] = useState(false);

  // Get data list user
  const { data: listUser, error: listUserError } = useSWR<IUser[]>(USER_ENDPOINT, fetcher);
  const { users, dispatch: dispatchUser } = useContext(UserContext);

  // Get data list todo
  const { data: listTodo, error: listTodoError } = useSWR<ITodo[]>(
    selectingUserId ? `${TODO_ENDPOINT}/?idUser=${selectingUserId}` : '',
    fetcher,
  );
  const {
    todos,
    dispatch: dispatchTodo,
    isActionTodoError,
    todoErrorMessage,
  } = useContext(TodoContext);

  // Handle error in fetching data
  if (listUserError) return <div>Failed to load list user</div>;
  if (listTodoError) return <div>Failed to load list todo</div>;

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (listUser) {
      dispatchUser({
        action: UserAction.GET_USER,
        payload: listUser,
      });
    }
  }, [listUser]);

  useEffect(() => {
    if (listTodo) {
      dispatchTodo({
        action: TodoAction.GET_TODO,
        payload: listTodo,
      });
    }
  }, [listTodo]);

  // Add todo
  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get value in input
    const id = generationId();
    console.log(id);

    const task = (event.currentTarget.elements.namedItem('task') as HTMLInputElement).value;

    const todo: ITodo = {
      id,
      task: task,
      status: false,
      idUser: selectingUserId ? selectingUserId : '',
    };

    // Reset value input
    (event.currentTarget.elements.namedItem('task') as HTMLInputElement).value = '';

    try {
      setProcessingTodoList(true);
      dispatchTodo({
        action: TodoAction.CREATE_TODO,
        payload: { ...todo },
      });

      await addTodo(todo, TODO_ENDPOINT);
    } catch {
      alert(`Error when add new todo item: ${todo?.task}`);

      dispatchTodo({
        action: TodoAction.CREATE_TODO_FAILED,
        payload: { ...todo },
      });
    } finally {
      setProcessingTodoList(false);
    }
  };

  // Remove todo
  const handleRemoveTodo = async (id: string) => {
    const todoItemDeleting = todos.find((todo) => todo.id === id);

    try {
      setProcessingTodoList(true);
      dispatchTodo({
        action: TodoAction.DELETE_TODO,
        payload: todoItemDeleting,
      });

      await removeTodo(`${TODO_ENDPOINT}/${id}`);
    } catch {
      alert(`Error when remove todo item: ${todoItemDeleting?.task}`);

      dispatchTodo({
        action: TodoAction.DELETE_TODO_FAILED,
        payload: todoItemDeleting,
      });
    } finally {
      setProcessingTodoList(false);
    }
  };

  // Check done todo and un check done todo
  const handleCheckStatusTodo = async (id: string) => {
    const checkStatusTodoSelected = todos.find((item) => item.id === id);

    const todoUpdate = { ...checkStatusTodoSelected, status: !checkStatusTodoSelected?.status };
    try {
      dispatchTodo({
        action: TodoAction.CHECK_DONE_TODO,
        payload: todoUpdate,
      });

      await checkDoneTodo(`${TODO_ENDPOINT}/${id}`, todoUpdate as ITodo);
    } catch {
      alert(`Error when check done todo item: ${todoUpdate?.task}`);

      dispatchTodo({
        action: TodoAction.CHECK_DONE_TODO_FAILED,
        payload: todoUpdate,
      });
    }
  };

  // Remove todo by user
  const handleRemoveTodoByUser = (id: string) => {
    const listIdTodoRemove: string[] = [];

    // Get list id todo by user
    todos.map((todo) => {
      if (todo.idUser === id) {
        listIdTodoRemove.push(todo.id);
      }
    });

    // Delete todo by user
    listIdTodoRemove.map((id) => {
      handleRemoveTodo(id);
    });
  };

  // Remove user
  const handleRemoveUser = async (id: string) => {
    handleRemoveTodoByUser(id);

    const userDeleting = users.find((user) => user.id === id);

    try {
      setRemovingUser(true);
      dispatchUser({
        action: UserAction.DELETE_USER,
        payload: userDeleting,
      });

      await removeUser(`${USER_ENDPOINT}/${id}`);
      navigate(Path.HOME);
    } catch {
      alert(`Error when remove user item: ${userDeleting?.name}`);

      dispatchUser({
        action: UserAction.DELETE_USER_FAILED,
        payload: userDeleting,
      });
    } finally {
      setRemovingUser(false);
    }
  };

  // Confirm remove user
  const confirmRemoveUser = (id: string, name: string) => {
    if (window.confirm(`Are you sure remove user: ${name} ?`)) {
      handleRemoveUser(id);
    }
  };

  return (
    <div>
      <UserSidebar isRemovingUser={isRemovingUser} onRemoveUser={confirmRemoveUser} users={users} />
      {selectingUserId && (
        <BodyContent>
          <TodoForm onAddTodo={handleAddTodo} />
          {!listTodo ? (
            <p className='loading'>Loading...</p>
          ) : (
            <ListTodo
              onCheckDoneTodo={handleCheckStatusTodo}
              onRemoveTodo={handleRemoveTodo}
              todos={todos}
            />
          )}
          {isProcessingTodoList && <p className='loading'>Loading...</p>}
        </BodyContent>
      )}
    </div>
  );
};

export default Home;
