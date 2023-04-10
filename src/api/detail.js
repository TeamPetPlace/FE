import axios from "axios";
import { instance } from "./axios";

const getDetail = async (id) => {
  const response = await instance.get(`${id}`);
  return response.data.response;
};

const getReview = async (payload) => {
  const response = await instance.get(`${payload.id}/review`, {
    params: { page: payload.page, size: payload.size },
  });
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
      console.log(response.status);
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.toJSON().status);
      if (error.toJSON().status === 400) {
        return alert(`후기는 1주일에 한 번만 작성할 수 있습니다`);
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

export {
  getDetail,
  getReview,
  addReview,
  deleteReview,
  updateReviews,
  getHistory,
};
