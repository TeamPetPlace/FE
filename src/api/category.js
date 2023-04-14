import { baseURL, instance } from "./axios";
import Swal from "sweetalert2";

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
    if (response.data === "" || null) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "검색 결과가 없습니다.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
    }
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
