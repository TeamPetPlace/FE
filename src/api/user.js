import axios from "axios";
import { instance, baseURL } from "./axios";
import { getCookie } from "./cookie";

export const UserSignup = async (payload) => {
  try {
    const data = await baseURL.post("/signup", {
      email: payload.email,
      password: payload.password,
      nickname: payload.nickname,
    });
    // console.log(data);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const BusinessSignup = async (payload) => {
  try {
    const data = await baseURL.post("/business_signup", {
      email: payload.email,
      password: payload.password,
      nickname: payload.nickname,
      business: payload.business,
    });
    // console.log(data);
    return data;
  } catch (error) {
    return error.data;
  }
};

export const NomalLogin = async (payload) => {
  try {
    const response = await instance.post("/login", {
      email: payload.email,
      password: payload.password,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.data;
  }
};

export const KaKaoLogin = () => {
  const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_KAKAO_REDIRECT_URI } = process.env;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  window.location.href = link;

  // instance.get(`/kakao/callback/`)
};

export const CheckEmail = async (payload) => {
  try {
    const response = await baseURL.get("/signup/usercheck", {
      params: { email: payload },
    });
    console.log(response);
    return response.data.success;
  } catch (error) {
    // console.log(error);
    return error.data;
  }
};

export const CheckBizNum = async (payload) => {
  try {
    const response = await baseURL.get("/signup/businesscheck", {
      params: { business: payload },
    });
    // console.log(response);
    return response.data.success;
  } catch (error) {
    // console.log(error);
    return error.data;
  }
};
