import { useEffect } from "react";
import { kakaoURL } from "../api/axios";
import { setCookie } from "../api/cookie";

const Redirect = () => {
  const code = new URL(window.location.toString()).searchParams.get("code");

  useEffect(() => {
    kakaoURL
      .get(`/kakao/callback?code=${code}`)
      .then((response) => {
        console.log(response);
        // if (response.success === true) {
        const AccessToken = response.headers["authorization"];
        setCookie("AccessToken", AccessToken);
        const token = response.config.headers.Authorization;
        setCookie("token", token);
        setCookie("loginType", response.config.headers.loginType);
        setCookie("email", response.response.email);
        setCookie("nickname", response.response.nickname);
        window.location.href = "/main";
        return response;
        // }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, [code]);

  return;
};

export default Redirect;
