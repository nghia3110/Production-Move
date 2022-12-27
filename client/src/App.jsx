import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout, FormLayout } from './components/Layout';
import useRoutes from './router';
import Login from './pages/Login';
import AdminHome from './pages/Admin/AdminHome';
import useToken from './hooks/useToken';
import SignUp from './pages/Signup';

function App() {
  const publicRoutes = useRoutes();
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<FormLayout><Login setToken={setToken} /></FormLayout>} />
          <Route path='/sign-up' element={<FormLayout><SignUp /></FormLayout>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    )
  }
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<DefaultLayout><AdminHome /></DefaultLayout>}></Route>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout><Page /></Layout>}>
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
