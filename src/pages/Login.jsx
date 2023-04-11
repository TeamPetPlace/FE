import React from "react";
import LoginForm from "../components/register/LoginForm";
import { useCookies } from "react-cookie";
import CheckLogin from "../components/register/CheckLogin";

function Login() {
  const [cookies] = useCookies(["AccessToken", "loginType"]);
  return (
    <div>
      {cookies.AccessToken !== undefined ? <CheckLogin /> : <LoginForm />}
    </div>
  );
}

export default Login;
