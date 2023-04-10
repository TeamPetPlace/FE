import { instance } from "./axios";
import axios from "axios";

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
        return alert(`Error : ${err.message}`);
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
        return alert(`Error : ${err.message}`);
      }
    });
};

export { getPost, addDibs, cancelDibs };
