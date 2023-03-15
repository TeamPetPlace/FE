import { baseURL, instance } from "./axios";

export const getDetailPost = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  console.log(response);
  return response;
};

// 전체 조회: 무한스크롤 때문에?
export const getCards = async ({ keyword, page, size }) => {
  const response = await instance.get(
    `/posts?keyword=${keyword}&page=${page}&size=${size}`
  );
  //console.log(response)
  return response;
};
