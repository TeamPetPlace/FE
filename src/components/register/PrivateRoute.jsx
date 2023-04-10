import React from "react";
import { useCookies } from "react-cookie";
import { Route, Navigate } from "react-router";
function PrivateRoute({ children, element: Element, ...rest }) {
  const [cookies] = useCookies(["AccessToken"]);
  const isLogin = cookies.AccessToken !== undefined;
  return isLogin ? children : <Navigate to="/error" />;
}

export default PrivateRoute;
