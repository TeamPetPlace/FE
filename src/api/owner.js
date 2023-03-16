import axios from "axios";
import { instance } from "./axios";

const addPost = async (formData) => {
  await instance
    .post("/post", formData, {
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

export { addPost, deletePost };
