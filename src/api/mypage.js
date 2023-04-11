import { instance } from "./axios";
import axios from "axios";
import Swal from "sweetalert2";

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

const deleteAllNotification = async () => {
  await instance
    .delete("/notifications/delete")
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

const getNotificationCount = async () => {
  const response = await instance.get("/notifications/count");
  return response.data;
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
  getNotificationCount,
};
