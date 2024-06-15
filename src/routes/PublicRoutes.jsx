import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegistrationForm } from '../pages/RegistrationForm/RegistrationForm';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RoleSelectionForm } from '../pages/RoleSelectionForm/RoleSelectionForm';

const PublicRoutes = ({ handleRoleSelect, handleLogin, selectedRole }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<RoleSelectionForm onSelect={handleRoleSelect} selectedRole={selectedRole} />}
      />
      <Route
        path="/role"
        element={<RoleSelectionForm onSelect={handleRoleSelect} selectedRole={selectedRole} />}
      />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} role={selectedRole} />} />
    </Routes>
  );
};

export default PublicRoutes;
