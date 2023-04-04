import { instance } from "./axios";
import axios from "axios";

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

const getNotification = async () => {
  const response = await instance.get("/notifications");
  return response.data;
};

export { getPost, addDibs, cancelDibs, getNotification };
