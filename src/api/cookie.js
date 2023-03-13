import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (access_token, value, option) => {
  return cookie.set(access_token, value, { option });
};

export const getCookie = (access_token) => {
  return cookie.get(access_token);
};

export const removeCookie = (access_token) => {
  return cookie.remove(access_token);
};
