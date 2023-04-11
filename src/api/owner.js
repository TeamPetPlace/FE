import axios from "axios";
import { instance } from "./axios";
import Swal from "sweetalert2";

const addPost = async (formData) => {
  await instance
    .post("/write", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundaryfApYSlK1ODwmeKW3",
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

const deletePost = async (id) => {
  await instance
    .delete(`${id}`)
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

const updatePost = async (payload) => {
  await instance
    .patch(
      `${payload.id}`,
      {
        image: payload.image,
        title: payload.title,
        category: payload.category,
        contents: payload.contents,
        address: payload.address,
        lat: payload.lat,
        lng: payload.lng,
        cost: payload.cost,
        ceo: payload.ceo,
        telNum: payload.telNum,
        startTime: payload.startTime,
        endTime: payload.endTime,
        closedDay: payload.closedDay,
        aboolean1: payload.aboolean1,
        aboolean2: payload.aboolean2,
        feature1: payload.feature1,
      },
      {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundaryfApYSlK1ODwmeKW3",
        },
      }
    )
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

const checkTitle = async (payload) => {
  try {
    const response = await instance.get("/check_duplicate", {
      params: { title: payload },
    });
    console.log(response);
    return response.data.success;
  } catch (error) {
    console.log(error);
    return error.data;
  }
};

export { addPost, deletePost, updatePost, checkTitle };
