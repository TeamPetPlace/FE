import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";

const access_token = getCookie("ACCESS_TOKEN");

export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const kakaoURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    authorization: `${access_token}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// //인스턴스 request header
instance.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) return;
    const access_token = getCookie("access_token");
    config.headers["Authorization"] = `${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const OriginRequestError = error.config;
    console.log(OriginRequestError);
    if (error.response.status === 401 && !OriginRequestError._retry) {
      OriginRequestError._retry = true;
      const refresh_token = getCookie("refresh_token");

      if (refresh_token) {
        try {
          console.log("재발급중...");
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/token`, {
            headers: {
              Refresh_Token: `${refresh_token}`,
            },
          });
          const access_token = response.headers.authorization;
          setCookie("access_token", access_token);
          OriginRequestError.header.Authorization = `${access_token}`;
          console.log("재발급 완료, 재실행");
          return baseURL(OriginRequestError);
          // const refresh_token = response.headers.authorization;
          // setCookie("refresh_token", refresh_token);
          // OriginRequestError.header.Authorization = `${refresh_token}`;
          // console.log("재발급 완료, 재실행");
          // return baseURL(OriginRequestError);
        } catch (error) {
          //두가지 토큰 모두 만료시
          removeCookie("access_token");
          removeCookie("refresh_token");
          alert("세션이 만료되었습니다. 다시 로그인해주세요!");
          window.location.href("/");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject("error", error);
  }
);
