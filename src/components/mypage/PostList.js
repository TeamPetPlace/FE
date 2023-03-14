import React from "react";
import { useQuery } from "react-query";
import { getMyPost } from "../../api/mypage";

function PostList() {
  const { data } = useQuery("getmypost", () => getMyPost());
  return (
    <div>
      {data?.data.response.map((item) => {
        <div key={item.id}>
          <div>{item.id}id</div>
          <div>{item.category}업종</div>
          <div>{item.contents}소개</div>
        </div>;
      })}
    </div>
  );
}

export default PostList;
