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
  const response = await instance.get("/mypage/business");
  return response.data;
};

const getMyReview = async () => {
  const response = await instance.get("/review");
  console.log(response);
  return response.data;
};

const getMyDibs = async () => {
  const response = await instance.get("/mypage/dibs");
  return response.data;
};

export { getMypage, updateUser, getMyPost, getMyReview, getMyDibs };
