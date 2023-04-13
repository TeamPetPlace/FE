import { useEffect } from "react";
import { kakaoURL } from "../api/axios";
import { setCookie } from "../api/cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    kakaoURL
      .get(`/kakao/callback?code=${code}`)
      .then((response) => {
        console.log(response);
        const AccessToken = response.headers.authorization;
        // const RefreshToken = response.headers.refreshtoken;

        // if (response.data.success === true) {
        Cookies.set("AccessToken", AccessToken);
        // setCookie("RefreshToken", RefreshToken, { path: "/" });

        Cookies.set("loginType", response.data.response.loginType);
        Cookies.set("email", response.data.response.email);
        Cookies.set("nickname", response.data.response.nickname);
        navigate("/main");
        // }
        return response;
      })
      .catch((error) => {
        console.log(error);
        console.log("카카오로그인 실패");
        // window.location.href = "/";
        return;
      });
  }, [code]);

  return;
};

export default Redirect;
