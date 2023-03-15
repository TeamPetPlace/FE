import { baseURL, instance } from "./axios";

export const getDetailPost = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  console.log(response);
  return response;
};

// 플레이스별 페이지
export const getCards = async ({ keyword, page, size }) => {
  const { cardsData: data } = await instance.get(
    `/posts?keyword=${keyword}&page=${page}&size=${size}`
  );
  console.log(data);
  return data;
};

//플레이스별 페이지 검색창
export const getTitles = async ({ keyword, keyword2 }) => {
  const { titleData: data } = await instance.get(
    `/posts?keyword=${keyword}&keyword2=${keyword2}`
  );
  //console.log(response)
  return data;
};
