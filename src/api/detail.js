import axios from "axios";
import { instance } from "./axios";

const getDetail = async (id) => {
  const response = await instance.get(`${id}`);
  return response.data;
};

const addReview = async (payload) => {
  await instance
    .post(
      `${payload.id}/review`,
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
    .delete(`/review/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const updateReviews = async (payload) => {
  await instance
    .put(`review/${payload.reviewId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(payload.reviewId);
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const getHistory = async () => {
  const response = await instance.get("/posts/history");
  return response.data;
};

export { getDetail, addReview, deleteReview, updateReviews, getHistory };
