import { baseURL, instance } from "./axios";

export const getCards = async ({ page, size }) => {
  const response = await instance.get(
    `/category?category=미용&sort=DISTANCE&lat=177.256&lng=110.2233&page=0&size=2`
  );
  return response;
};

export const AllPost = async (payload) => {
  const response = await instance.get("/category", {
    params: {
      category: payload.category,
      sort: payload.sort,
      lat: payload.lat,
      lng: payload.lng,
      page: payload.page,
      size: payload.size,
    },
  });
  return response;
};

export const SearchPost = async (payload) => {
  const response = await instance.get("/category/search", {
    params: {
      category: payload.category,
      sort: payload.sort,
      keyword: payload.keyword,
      lat: payload.lat,
      lng: payload.lng,
      page: payload.page,
      size: payload.size,
    },
  });
  return response;
};

export const LikesPost = async (payload) => {
  try {
    await instance.post(`/${payload.id}/like`);
  } catch (error) {}
};

export const DeleteLikePost = async (payload) => {
  try {
    await instance.delete(`/${payload.id}/cancel`);
  } catch (error) {}
};
