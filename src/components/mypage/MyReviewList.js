import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMyReview } from "../../api/mypage";

function MyReviewList() {
  const [reviewList, setReviewList] = useState([]);

  const { data } = useQuery("getMyReview", getMyReview, {
    onSuccess: (response) => {
      setReviewList(response);
      console.log(response);
    },
  });

  return (
    <div>
      <div>
        {reviewList?.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.email}이메일</div>
              <div>{item.nickname}닉네임</div>
              <div>{item.review}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyReviewList;
