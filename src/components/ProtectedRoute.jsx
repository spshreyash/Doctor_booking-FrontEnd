import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Store/AuthContext';
import { Loading } from '../pages/Loading';


export const ProtectedRoute = ({ children, allowedRoles }) => {
 const{role,user, loading}=useContext(AuthContext)
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - role:", role);
   console.log("ProtectedRoute - loading:", loading);

  if (loading) {
  return <> <Loading/> </>;
}
  if (!user) {
    return <Navigate to="/" />;
  }

  const isAllowed = allowedRoles.includes(role);
  if (!isAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
