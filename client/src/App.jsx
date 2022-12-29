import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FormLayout } from './components/Layout';
import useRoutes from './router';
import Login from './pages/Login';
import useToken from './hooks/useToken';
import SignUp from './pages/Signup';
import './App.css'
import { useStateContext } from './context/ContextProvider';
import AdminRoutes from './router/AdminRoutes';
import UserRoutes from './router/UserRoutes';
import getUser from './api/userData';
import { useEffect } from 'react';

function App() {
  const routes = useRoutes();
  const { token, setToken } = useToken();
  const { userProfileData, setUserProfileData, onLoginPage, setOnLoginPage} = useStateContext();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser(token);
      setUserProfileData({
        id: data.id,
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        role: data.role
      });
    }
    if (token.length != 0) {
      setOnLoginPage(false);
      getUserData();
    }

  }, [])

  return (
    <>
      {onLoginPage &&
        <Router>
          <Routes>
            <Route path='/' element={<FormLayout><Login setToken={setToken} /></FormLayout>} />
            <Route path='/sign-up' element={<FormLayout><SignUp /></FormLayout>} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>}
      {!onLoginPage && <Router>
        <div className="App">
          {userProfileData.role == 'Quản trị viên' && <AdminRoutes routes={routes.adminRoutes} />}
          {userProfileData.role != 'Quản trị viên' && <UserRoutes routes={routes.userRoutes} />}
        </div>
      </Router>}
    </>
  );
}

export default App;
