import React from 'react';
import { Navigate } from 'react-router-dom';

// A ProtectedRoute component to check if the technician is logged in
const ProtectedRoute = ({ children }) => {
  const isTechLoggedIn = localStorage.getItem('isTechLoggedIn');

  if (!isTechLoggedIn) {
    // If not logged in, redirect to the technician login page
    return <Navigate to="/tech" replace />;
  }

  // If logged in, render the children components (TechnicianDashboard)
  return children;
};

export default ProtectedRoute;
