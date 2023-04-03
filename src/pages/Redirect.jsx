import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoURL } from "../api/axios";
import { getCookie, setCookie } from "../api/cookie";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");

  useEffect(() => {
    kakaoURL
      .get(`/kakao/callback?code=${code}`)
      .then((response) => {
        if (response.success === true || response.data.resonse.status === 200) {
          const AccessToken = response.headers["Authorization"];
          setCookie("AccessToken", AccessToken);
          setCookie("loginType", response.data.response.loginType);
          setCookie("email", response.data.response.email);
          setCookie("nickname", response.data.response.nickname);
          setCookie("email", response.data.response.email);
          window.location.href = "/main";
          return response;
        }
      })
      .catch((error) => {
        return;
      });
  }, []);

  return;
};

export default Redirect;
