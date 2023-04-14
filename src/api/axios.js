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
    const originalRequest = error.config;
    console.log(originalRequest);
    try {
      console.log("재발급중...");
      console.log(error.response);
      if (
        error.response.data.status === 401 ||
        error.response.status === 401 ||
        error.response.data.message === "Token Error"
      ) {
        const RefreshToken = getCookie("RefreshToken");
        const AccessToken = getCookie("AccessToken");
        const refreshedResponse = await baseURL.get("/token", {
          headers: {
            Authorization: AccessToken,
            RefreshToken: RefreshToken,
          },
        });
        /* CHANGE ACCESSTOKEN*/
        console.log(refreshedResponse);
        originalRequest.headers["Authorization"] = refreshedResponse.headers["Authorization"];
        console.log("재발급 완료");
        removeCookie("AccessToken");
        setCookie("AccessToken", refreshedResponse.headers["authorization"]);
        return baseURL(originalRequest);
      }
    } catch (error) {
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
    console.log(config);
    if (config.headers === undefined) return;
    const AccessToken = getCookie("AccessToken");
    config.headers.Authorization = `${AccessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
