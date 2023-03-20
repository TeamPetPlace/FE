import { instance } from "./axios";

const getPost = async () => {
  const response = await instance.get(
    "/topPosts?category=미용&lat=177.256&lng=110.2233"
  );
  return response.data;
};

export { getPost };
