import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const result = localStorage.getItem("loginData");
  return result ? true : false;
};

const PrivateRoute = ({
  children,
  forAuthScreens,
}: {
  children: any;
  forAuthScreens?: boolean;
}) => {
  return isAuthenticated() ? (
    forAuthScreens ? (
      <Navigate to='/' />
    ) : (
      children
    )
  ) : forAuthScreens ? (
    children
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
