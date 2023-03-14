import React from "react";
import { useQuery } from "react-query";
import { getMyReview } from "../../api/mypage";

function ReviewList() {
  const { data } = useQuery("getmyreview", () => getMyReview());
  return (
    <div>
      {data?.data.response.map((item) => {
        <div key={item.id}>
          <div>{item.id}id</div>
          <div>{item.review}리뷰</div>
          <div>{item.nickname}닉네임</div>
        </div>;
      })}
    </div>
  );
}

export default ReviewList;
