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

// const updatePost = async (id, formData) => {
//   await instance
//     .post(`/posts/${id}`, formData, {
//       headers: {
//         "Content-Type":
//           "multipart/form-data; boundary=----WebKitFormBoundaryfApYSlK1ODwmeKW3",
//       },
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       if (axios.isAxiosError(err)) {
//         return alert(`Error : ${err.message}`);
//       }
//     });
// };

export { addPost, deletePost, updatePost };
