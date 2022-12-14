// Lib
import { Route, Routes, useRoutes } from 'react-router-dom';

// Styles
import './styles/index.css';

// Constants
import { Path } from '@constants/paths';

// Pages
import Home from '@pages/home';
import RegisterUser from '@pages/registerUser';

// Components
import { TodoProvider } from '@components/TodoProvider';
import { UserProvider } from '@components/UserProvider';

function App() {
  return (
    <TodoProvider>
      <UserProvider>
        <Routes>
          <Route path={Path.REGISTER_USER} element={<RegisterUser />} />
          <Route path={Path.HOME} element={<Home />} />
          <Route path={`${Path.HOME}:selectingUserId`} element={<Home />} />
        </Routes>
      </UserProvider>
    </TodoProvider>
  );
}

export default App;
