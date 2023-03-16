import { instance } from "./axios";

const getDetail = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  return response.data;
};

export { getDetail };
