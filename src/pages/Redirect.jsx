import { useEffect } from "react";
import { kakaoURL } from "../api/axios";
import { setCookie } from "../api/cookie";
import axios from "axios";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");

  useEffect(() => {
    kakaoURL
      .get(`/kakao/callback?code=${code}`)
      .then((response) => {
        console.log(response);
        const AccessToken = response.headers.authorization;
        const RefreshToken = response.headers.refreshtoken;

        // if (response.data.success === true) {
        setCookie("AccessToken", AccessToken, { path: "/" });
        setCookie("RefreshToken", RefreshToken, { path: "/" });
        setCookie("loginType", response.data.response.loginType, { path: "/" });
        setCookie("email", response.data.response.email, { path: "/" });
        setCookie("nickname", response.data.response.nickname, { path: "/" });
        // window.location.href = "/main";
        // }
        return response;
      })
      .catch((error) => {
        console.log(error);
        console.log("카카오로그인 실패");
        // window.location.href = "/";
        return;
      });
  }, []);

  return;
};

export default Redirect;
