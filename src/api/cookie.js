import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (token, value, option) => {
  return cookie.set(token, value, { option });
};

export const getCookie = (token) => {
  return cookie.get(token);
};

export const removeCookie = (token) => {
  return cookie.remove(token);
};
