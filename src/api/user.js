import { instance, baseURL } from "./axios";

export const UserSignup = async (payload) => {
  try {
    const data = await baseURL.post("/signup", {
      email: payload.email,
      password: payload.password,
      nickname: payload.nickname,
    });
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
    return response;
  } catch (error) {
    return error;
  }
};

export const CheckEmail = async (payload) => {
  try {
    const response = await baseURL.get("/signup/usercheck", {
      params: { email: payload },
    });
    console.log(response.data.success);
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
