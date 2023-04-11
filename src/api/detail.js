import axios from "axios";
import { instance } from "./axios";
import Swal from "sweetalert2";

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
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "후기는 1주일에 한 번만 작성이 가능합니다.",
          confirmButtonColor: "#FFD53F",
          timer: 3000,
        });
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
