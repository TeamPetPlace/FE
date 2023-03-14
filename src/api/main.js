import { instance } from "./axios";

const getPost = async () => {
  const response = await instance.get("/mains");
  return response.data;
};

export { getPost };
