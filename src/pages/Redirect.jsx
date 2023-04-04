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
        const AccessToken = response.headers.authorization;
        const RefreshToken = response.headers.refreshtoken;

        if (response.data.success === true) {
          setCookie("AccessToken", AccessToken);
          setCookie("RefreshToken", RefreshToken);
          setCookie("loginType", response.data.loginType);
          setCookie("email", response.data.email);
          setCookie("nickname", response.data.nickname);
          window.location.href = "/main";
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, [code]);

  return;
};

export default Redirect;
