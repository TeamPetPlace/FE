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

export const BussinessSignup = async (payload) => {
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

export const KaKaoLogin = async (payload) => {
  try {
    const response = await instance.post("/kakao");
    // console.log(response);
    return response;
  } catch (error) {
    return error.data;
  }
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
