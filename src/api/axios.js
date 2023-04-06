import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";
import { useCookies } from "react-cookie";
const AccessToken = getCookie("AccessToken");

//instance without token
export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

//instance with token---------------------------------------------
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

//인스턴스 request header
instance.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) return;
    const AccessToken = getCookie("AccessToken");
    config.headers.Authorization = `${AccessToken}`;
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 인스턴스 response header
instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const { response, config } = error;
    console.log(error);
    const originalRequest = error.config;
    try {
      console.log("재발급중...");
      console.log(error);
      console.log(response.status);
      if (error.code === "ERR_BAD_REQUEST" || response.status === 401) {
        const RefreshToken = getCookie("RefreshToken");
        const refreshedResponse = await baseURL.get("/token", {
          headers: {
            RefreshToken: RefreshToken,
          },
        });
        /* CHANGE ACCESSTOKEN*/
        console.log(refreshedResponse);
        originalRequest.headers["Authorization"] = refreshedResponse.headers["authorization"];
        console.log("재발급 완료");
        removeCookie("AccessToken");
        setCookie("AccessToken", refreshedResponse.headers.Authorization);
        return baseURL(originalRequest);
      }
    } catch (error) {
      let isLoggedInExpiredShown = false;
      // 새로운 accessToken 발급에 실패한 경우 쿠키에 있던 기존 토큰을 모두 없애고 redirect
      ["AccessToken", "RefreshToken", "loginType", "email", "nickname", "lat", "lng"].forEach(
        (cookie) => removeCookie(cookie)
      );
      if (!isLoggedInExpiredShown) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요!");
        isLoggedInExpiredShown = true;
      }
      console.log("로그인 만료");
      window.location.replace("/");
      return false;
    }
    return Promise.reject(error);
  }
);

//instance for kakaologin---------------------------------------------
export const kakaoURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `${AccessToken}`,
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

kakaoURL.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) return;
    const AccessToken = getCookie("AccessToken");
    config.headers.Authorization = `${AccessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

kakaoURL.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const { response, config } = error;
    console.log(error);
    console.log(response);
    console.log(config);
    const originalRequest = error.config;
    try {
      console.log("재발급중...");
      console.log(error);
      console.log(response.status);
      if (error.code === "ERR_BAD_REQUEST" || response.status === "401") {
        const RefreshToken = getCookie("RefreshToken");
        const refreshedResponse = await baseURL.get("/token", {
          headers: {
            RefreshToken: RefreshToken,
          },
        });
        /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
        console.log(refreshedResponse);
        originalRequest.headers["Authorization"] = refreshedResponse.headers["authorization"];
        console.log("재발급 완료");
        removeCookie("AccessToken");
        setCookie("AccessToken", refreshedResponse.headers.Authorization);
        return baseURL(originalRequest);
      }
    } catch (error) {
      let isLoggedInExpiredShown = false;
      // 새로운 accessToken 발급에 실패한 경우 쿠키에 있던 기존 토큰을 모두 없애고 redirect
      ["AccessToken", "RefreshToken", "loginType", "email", "nickname", "lat", "lng"].forEach(
        (cookie) => removeCookie(cookie)
      );
      if (!isLoggedInExpiredShown) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요!");
        isLoggedInExpiredShown = true;
      }
      console.log("로그인 만료");
      window.location.replace("/");
      return false;
    }
    return Promise.reject(error);
  }
);
