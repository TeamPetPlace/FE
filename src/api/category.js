import { baseURL, instance } from "./axios";

export const getCards = async ({ page, size }) => {
  const response = await instance.get(
    `/category?category=미용&sort=DISTANCE&lat=177.256&lng=110.2233&page=0&size=2`
  );
  console.log(response);
  return response;
};

export const ALLHospitalPost = async (sort, lat, lng, page, size) => {
  const response = await instance.get(
    `/category?category=병원&sort=DISTANCE&lat= 37.53502829566887&lng=126.96471596469242&page=0&size=2`
  );
  console.log(response);
  return response;
};

export const ALLShopPost = async (sort, lat, lng, page, size) => {
  const response = await instance.get(
    `/category?category=미용&sort=DISTANCE&lat= 37.53502829566887&lng=126.96471596469242&page=0&size=2`
  );
  console.log(response);
  return response;
};

export const ALLCafePost = async (sort, lat, lng, page, size) => {
  const response = await instance.get(
    `/category?category=카페&sort=DISTANCE&lat= 37.53502829566887&lng=126.96471596469242&page=0&size=2`
  );
  console.log(response);
  return response;
};

export const HospitalSearch = async (payload) => {
  const response = await instance.get("/posts", {
    params: {
      keyword: payload.keyword,
      keyword2: payload.keyword2,
    },
  });
  console.log(response);
  return response;
};
