import { baseURL, instance } from "./axios";

export const getDetailPost = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  console.log(response);
  return response;
};
