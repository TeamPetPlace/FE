import axios from "axios";
import { instance } from "./axios";

const getDetail = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  return response.data;
};

const addReview = async (payload) => {
  await instance
    .post(
      `/post/${payload.id}/reviews`,
      {
        review: payload.review,
        image: payload.image,
        star: payload.star,
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

const deleteReview = async (id) => {
  await instance
    .delete(`/post/reviews/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const updateReview = async ({ id, payload }) => {
  await instance
    .put(`/post/reviews/${id}`, {
      review: payload.review,
      image: payload.image,
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

export { getDetail, addReview, deleteReview, updateReview };
