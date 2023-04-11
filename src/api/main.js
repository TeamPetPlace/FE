import { instance } from "./axios";
import axios from "axios";
import Swal from "sweetalert2";

export const postChatting = async (postId) => {
  try {
    const response = await instance.post(`/chat/${postId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (payload) => {
  const response = await instance.get("/topPosts", {
    params: {
      category: payload.category,
      lat: payload.lat,
      lng: payload.lng,
    },
  });
  return response.data;
};

const addDibs = async (payload) => {
  await instance
    .post(`/${payload.id}/like`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "에러가 발생하였습니다.",
          text: "다시 시도해주시기 바랍니다.",
          confirmButtonColor: "#FFD53F",
          timer: 3000,
        });
      }
    });
};

const cancelDibs = async (payload) => {
  await instance
    .delete(`/${payload.id}/cancel`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "에러가 발생하였습니다.",
          text: "다시 시도해주시기 바랍니다.",
          confirmButtonColor: "#FFD53F",
          timer: 3000,
        });
      }
    });
};

export { getPost, addDibs, cancelDibs };
