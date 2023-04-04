import { instance } from "./axios";
import axios from "axios";

const getMypage = async () => {
  const response = await instance.get("/mypage");
  return response.data;
};

const updateUser = async (payload) => {
  await instance
    .patch(`/mypage`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const getMyPost = async () => {
  const response = await instance.get("/mypage/business?page=0&size=4");
  return response.data;
};

const getMyReview = async (payload) => {
  const response = await instance.get("/review", {
    params: { page: payload.page, size: payload.size },
  });
  return response.data;
};

const getMyDibs = async (payload) => {
  const response = await instance.get("/mypage/favorite", {
    params: { page: payload.page, size: payload.size },
  });
  return response.data;
};

const getNotification = async () => {
  const response = await instance.get("/notifications");
  return response.data;
};

const deleteNotification = async (id) => {
  await instance
    .delete(`/notifications/delete/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const deleteAllNotification = async () => {
  await instance
    .delete("/notifications/delete")
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

export {
  getMypage,
  updateUser,
  getMyPost,
  getMyReview,
  getMyDibs,
  getNotification,
  deleteNotification,
  deleteAllNotification,
};
