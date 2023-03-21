import { baseURL, instance } from "./axios";

export const getCards = async ({ page, size }) => {
  const response = await instance.get(
    `/category?category=미용&sort=DISTANCE&lat=177.256&lng=110.2233&page=0&size=30`
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
  try {
    const response = await instance.get("/category/search", {
      params: {
        category: payload.category,
        keyword: payload.keyword,
        sort: payload.sort,
        lat: payload.lat,
        lng: payload.lng,
        page: payload.page,
        size: payload.size,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const AddLikesPost = async (payload) => {
  try {
    await instance.post(`/${payload.id}/like`);
  } catch (error) {}
};

export const DeleteLikePost = async (payload) => {
  try {
    await instance.delete(`/${payload.id}/cancel`);
  } catch (error) {}
};
