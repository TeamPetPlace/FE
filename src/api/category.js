import { baseURL, instance } from "./axios";
import Hospital from "../pages/Hospital";

export const getDetailPost = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  console.log(response);
  return response;
};

// 플레이스별 페이지
export const getCards = async ({ page, size }) => {
  const response = await instance.get(
    `/posts?keyword=병원&page=${page}&size=${size}`
  );
  console.log(response);
  return response;
};

//플레이스별 페이지 검색창
export const getTitles = async ({ keyword2 }) => {
  const response = await instance.get(
    `/posts?keyword=병원&keyword2=${keyword2}`
  );
  console.log(response.data);
  return response.data;
};
