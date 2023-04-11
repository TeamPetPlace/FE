import { useEffect } from "react";
import { kakaoURL } from "../api/axios";
import { setCookie } from "../api/cookie";
import axios from "axios";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");

  // useEffect(() => {
  //   axios
  //     .get(`/kakao/callback?code=${code}`, {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         Authorization: `${AccessToken}`,
  //         accept: "application/json",
  //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       const AccessToken = response.config.headers.Authorization;

  //       // if (response.data.success === true) {
  //       setCookie("AccessToken", AccessToken, { path: "/" });
  //       setCookie("loginType", response.data.response.loginType, { path: "/" });
  //       setCookie("email", response.data.response.email, { path: "/" });
  //       setCookie("nickname", response.data.response.nickname, { path: "/" });
  //       window.location.href = "/main";
  //       // }
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log("카카오로그인 실패");
  //       window.location.href = "/";
  //       return;
  //     });
  // }, []);

  useEffect(() => {
    try {
      const response = axios.get(`/kakao/callback?code=${code}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(response);
      const AccessToken = response.config.headers.Authorization;

      // if (response.data.success === true) {
      setCookie("AccessToken", AccessToken, { path: "/" });
      setCookie("loginType", response.data.response.loginType, { path: "/" });
      setCookie("email", response.data.response.email, { path: "/" });
      setCookie("nickname", response.data.response.nickname, { path: "/" });
      window.location.href = "/main";
      return response;
    } catch (error) {
      console.log(error);
      console.log("카카오로그인 실패");
      window.location.href = "/";
      return error;
    }
  }, []);

  return;
};

export default Redirect;
