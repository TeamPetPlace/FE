import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL, instance, kakaoURL } from "../api/axios";
import { getCookie, setCookie } from "../api/cookie";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");

  useEffect(() => {
    kakaoURL
      .get(`/kakao/callback?code=${code}`)
      .then((response) => {
        if (response.headers.Authorization !== undefined) {
          const access_token = response.headers["Authorization"];
          setCookie("access_token", access_token);
          setCookie("loginType", response.data.response.loginType);
          console.log(response.headers["Authorization"]);
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
