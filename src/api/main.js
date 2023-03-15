import { instance } from "./axios";

const getPost = async () => {
  const response = await instance.get("/mains");
  return response.data;
};

// const getCards = async () => {
//   const response = await instance.get(`/posts?keyword=병원`);
//   console.log(response);
//   return response;
// };

export { getPost };
