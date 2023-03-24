import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";
import { debounce } from "lodash";

const access_token = getCookie("ACCESS_TOKEN");

//instance without token
export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

//instance for kakaologin
export const kakaoURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    authorization: `${access_token}`,
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

//instance with token
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
    // if (config.headers === undefined) return;
    const access_token = getCookie("access_token");
    config.headers["Authorization"] = `${access_token}`;
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
    const originalRequest = config;
    try {
      console.log("재발급중...");
      // console.log(response);
      // console.log(config);

      if (error.response.data.status === "400") {
        const Refresh_token = getCookie("Refresh_token");
        const refreshedResponse = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/token`,
          headers: {
            accept: "application/json",
            // "Content-Type": "application/json",
            Refresh_token: Refresh_token,
          },
        });
        /* CHANGE ACCESSTOKEN ------------------------------------------------------- */
        originalRequest.headers.Authorization = refreshedResponse.headers.Authorization;
        console.log("재발급 완료, 재실행");
        removeCookie("access_token");
        setCookie("access_token", refreshedResponse.headers.Authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      // 새로운 accessToken 발급에 실패한 경우 쿠키에 있던 기존 토큰을 모두 없애고 redirect
      removeCookie("access_token");
      removeCookie("refresh_token");
      alert("로그인 만료");
      window.location.replace("/");
      // return false;
      return Promise.reject(error);
    }
    return axios(originalRequest);
    // return Promise.reject(error);
  }
);

// const OriginRequestError = error.config;
// // console.log(OriginRequestError);
// if (error.response.status === 401 && !OriginRequestError._retry) {
//   // OriginRequestError._retry = true;
//   const refresh_token = getCookie("refresh_token");

//   if (refresh_token) {
//     try {
//       console.log("재발급중...");
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/token`, {
//         headers: {
//           Refresh_Token: `${refresh_token}`,
//         },
//       });
//       OriginRequestError.headers.Authorization = response.headers.authorization;
//       removeCookie("access_token");
//       setCookie("access_token", response.headers.authorization);
//       // OriginRequestError.header.Authorization = `${access_token}`;
//       console.log("재발급 완료, 재실행");
//       return axios(OriginRequestError);
//     } catch (error) {
//       //두가지 토큰 모두 만료시
//       console.log(error);
//       removeCookie("access_token");
//       removeCookie("refresh_token");
//       alert("세션이 만료되었습니다. 다시 로그인해주세요!");
//       window.location.replace("/");
//       return false;
//     }
//   }
// }
