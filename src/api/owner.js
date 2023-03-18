import axios from "axios";
import { instance } from "./axios";

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
        return alert(`Error : ${err.message}`);
      }
    });
};

const deletePost = async (id) => {
  await instance
    .delete(`/posts/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return alert(`Error : ${err.message}`);
      }
    });
};

const updatePost = async (payload) => {
  await instance
    .patch(
      `/posts/${payload.id}`,
      {
        image: payload.image,
        category: payload.category,
        title: payload.title,
        contents: payload.contents,
        address: payload.address,
        lat: payload.lat,
        lng: payload.lng,
        ceo: payload.ceo,
        telNum: payload.telNum,
        startTime: payload.startTime,
        endTime: payload.endTime,
        closedDay: payload.closedDay,
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
        return alert(`Error : ${err.message}`);
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
