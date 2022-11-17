// Lib
import { FormEvent, useContext, useEffect } from 'react';
import useSWR from 'swr';

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

// Constants
import { SERVER_ERROR } from '@constants/errorMessage';

const Home = () => {
  const { users, dispatch: dispatchUser, selectingUserId } = useContext(UserContext);
  const { data: listUser, error: listUserError } = useSWR<IUser[]>(USER_ENDPOINT, fetcher);

  const { todos, dispatch: dispatchTodo } = useContext(TodoContext);
  const { data: listTodo, error: listTodoError } = useSWR<ITodo[]>(
    `${TODO_ENDPOINT}/?idUser=${selectingUserId}`,
    fetcher,
  );

  // Handle error in fetching data
  if (listUserError) return <div>Failed to load list user</div>;
  if (listTodoError) return <div>Failed to load list todo</div>;

  useEffect(() => {
    if (listUser) {
      dispatchUser({
        action: UserAction.GET_USER_SUCCESS,
        payload: listUser,
      });
    }
  }, [listUser]);

  useEffect(() => {
    if (listTodo) {
      dispatchTodo({
        action: TodoAction.GET_TODO_SUCCESS,
        payload: listTodo,
      });
    }
  }, [listTodo]);

  // Add todo
  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get value in input
    const id = new Date().toJSON();
    const task = (event.currentTarget.elements.namedItem('task') as HTMLInputElement).value;
    const todo: ITodo = {
      id,
      task: task,
      status: false,
      idUser: selectingUserId ? selectingUserId : '',
    };

    // Reset value input
    (event.currentTarget.elements.namedItem('task') as HTMLInputElement).value = ' ';

    try {
      const response = await addTodo(todo, TODO_ENDPOINT);

      if (response) {
        dispatchTodo({
          action: TodoAction.CREATE_TODO_SUCCESS,
          payload: { ...todo },
        });
      }
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  // Remove todo
  const handleRemoveTodo = async (id: string) => {
    try {
      const response = await removeTodo(`${TODO_ENDPOINT}/${id}`);

      if (response) {
        dispatchTodo({
          action: TodoAction.DELETE_TODO_SUCCESS,
          payload: id,
        });
      }
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  // Check done todo
  const handleCheckDoneTodo = async (id: string) => {
    const checkDoneTodoSelected = todos.find((item) => item.id === id);

    let isResponse = false;

    if (checkDoneTodoSelected) {
      const todoUpdate = { ...checkDoneTodoSelected, status: !checkDoneTodoSelected?.status };
      await checkDoneTodo(`${TODO_ENDPOINT}/${id}`, todoUpdate);
      isResponse = true;
    }

    try {
      if (isResponse) {
        dispatchTodo({
          action: TodoAction.CHECK_DONE_TODO,
          payload: id,
        });
      }
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  // Remove todo by user
  const handleRemoveTodoByUser = (id: string) => {
    const listIdTodoRemove: string[] = [];

    todos.map((todo) => {
      if (todo.idUser === id) {
        listIdTodoRemove.push(todo.id);
      }
    });

    try {
      listIdTodoRemove.map((id) => {
        handleRemoveTodo(id);
      });
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  // Remove user
  const handleRemoveUser = async (id: string) => {
    handleRemoveTodoByUser(id);

    try {
      const response = await removeUser(`${USER_ENDPOINT}/${id}`);

      if (response) {
        dispatchUser({
          action: UserAction.DELETE_USER_SUCCESS,
          payload: id,
        });
      }
    } catch {
      throw new Error(SERVER_ERROR);
    }
  };

  return (
    <div>
      <UserSidebar onRemoveUser={handleRemoveUser} users={users} />
      <BodyContent>
        <TodoForm onAddTodo={handleAddTodo} />
        <ListTodo
          onCheckDoneTodo={handleCheckDoneTodo}
          onRemoveTodo={handleRemoveTodo}
          todos={todos}
        />
      </BodyContent>
    </div>
  );
};

export default Home;
