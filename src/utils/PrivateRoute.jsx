import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Login from '../components/Login';
const PrivateRoute = ({ user }) => {
  return user ? <Outlet /> : <Login />;
};

export default PrivateRoute;
