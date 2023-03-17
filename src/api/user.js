import axios from "axios";
import { instance, baseURL } from "./axios";

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
  // const REST_API_KEY = "94c5891ab6cec1f5eddede64f8358dd9";
  // const REDIRECT_URI = "https://petplace.site/kakao/callback";
  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get("code");
  const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_KAKAO_REDIRECT_URI } = process.env;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  window.location.href = link;
  // axios
  //   .get(
  //     `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  //     // "/kakao/callback"
  //     // `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  //   )
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
};

export const CheckEmail = async (payload) => {
  try {
    const response = await baseURL.get("/signup", {
      params: { email: payload },
    });
    console.log(response);
    return response.data.success;
  } catch (error) {
    console.log(error);
    return error.data;
  }
};
