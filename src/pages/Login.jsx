import React from "react";
import LoginForm from "../components/register/LoginForm";
import { useCookies } from "react-cookie";
import CheckLogin from "../components/register/CheckLogin";

function Login() {
  const [cookies] = useCookies(["access_token", "loginType"]);
  return (
    <div>
      {cookies.loginType === "USER" ||
      cookies.loginType === "BUSINESS" ||
      cookies.loginType === "KAKAO_USER" ? (
        <CheckLogin />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
