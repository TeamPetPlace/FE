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
        console.log(response.headers);
        console.log(response.data);
        const AccessToken = response.headers.authorization;
        const RefreshToken = response.headers.refreshtoken;

        if (response.data.success === true) {
          setCookie("AccessToken", AccessToken);
          setCookie("RefreshToken", RefreshToken);
          setCookie("loginType", response.data.response.loginType);
          setCookie("email", response.data.response.email);
          setCookie("nickname", response.data.response.nickname);
          // window.location.href = "/main";
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, []);

  return;
};

export default Redirect;
