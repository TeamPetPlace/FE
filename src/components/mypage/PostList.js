import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMyPost } from "../../api/mypage";

function PostList() {
  const [myList, setMyList] = useState([]);
  const { data } = useQuery("getmypost", getMyPost, {
    onSuccess: (response) => {
      setMyList(response);
      console.log(response);
    },
  });

  return (
    <div>
      <div>
        {myList.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.category}id</div>
              <div>{item.ceo}업종</div>
              <img src={item.image} alt="img" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostList;
