import { instance } from "./axios";
import axios from "axios";

const getMypage = async () => {
  const response = await instance.get("/mypage");
  return response.data;
};

const updateUser = async (payload) => {
  await instance
    .put(
      `/mypage/3`,
      {
        nickname: payload.nickname,
        image: payload.image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
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
  const response = await instance.get("/mypage/business");
  return response.data;
};

const getMyReview = async () => {
  const response = await instance.get("/myreview");
  return response.data;
};

const getMyDibs = async () => {
  const response = await instance.get("/mypage/dibs");
  return response.data;
};

export { getMypage, updateUser, getMyPost, getMyReview, getMyDibs };
