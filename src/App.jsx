import './App.css';
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import StudentRoutes from './routes/StudentRoute';
import TeacherRoutes from './routes/TeacherRoutes';
import AdminRoutes from './routes/AdminRoute';
import { LanguageProvider } from './contexts/LanguageContext';

export const ROLES = {
  Public: 'public',
  Teacher: 'teacher',
  Admin: 'admin',
  Student: 'student'
};

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [userRole, setUserRole] = useState(ROLES.Public);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(role);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('selectedRole');
    if (storedRole) {
      setSelectedRole(storedRole);
      setUserRole(storedRole);
    }
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if data exists in localStorage
    const user_data = localStorage.getItem('user_data');
    if (user_data) {
      setData(JSON.parse(user_data));
    }
  }, []);

  // const handleLogin = () => {
  //   setUserRole(selectedRole)
  // }

  const navigateToLogin = () => {
    localStorage.removeItem('selectedRole');
    localStorage.removeItem('user_data');
    setSelectedRole('');
    setUserRole('public');

    navigate('/');
    window.location.reload();
  };

  console.log('data role: ', data.role);

  return (
    <LanguageProvider>
      <BrowserRouter>
        {!data.role ? (
          <PublicRoutes
            handleRoleSelect={handleRoleSelect}
            selectedRole={selectedRole}
            //  handleLogin={handleLogin}
          />
        ) : data.role === 'student' ? (
          <StudentRoutes navigateToLogin={navigateToLogin} />
        ) : data.role === 'teacher' ? (
          <TeacherRoutes navigateToLogin={navigateToLogin} />
        ) : data.role === 'admin' ? (
          <AdminRoutes navigateToLogin={navigateToLogin} />
        ) : (
          <h1>There is an error in server</h1>
        )}
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
