import axios from "axios";
import { instance } from "./axios";

const addPost = async (formData) => {
  await instance
    .post("/post", formData, {
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

export { addPost };
