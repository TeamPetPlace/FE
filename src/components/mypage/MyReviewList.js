import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteReview, getDetail } from "../../api/detail";
import { getMyReview } from "../../api/mypage";

function MyReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  const { data } = useQuery("getMyReview", getMyReview, {
    onSuccess: (response) => {
      setReviewList(response);
      console.log(response);
    },
  });

  //후기 삭제
  const queryClient = useQueryClient();
  const deleteReviewMutation = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries("getMyReview"),
  });

  const onDeletetReviewHandler = (reviewId) => {
    const message = window.confirm("후기를 삭제하시겠습니까?");
    if (message) {
      deleteReviewMutation.mutate(reviewId);
      setReviewList([...reviewList]);
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        {reviewList?.map((item) => {
          return (
            <StReviews key={item.id}>
              <div>{item.id}이메일</div>
              <div>{item.email}이메일</div>
              <div>{item.nickname}닉네임</div>
              <div>{item.review}</div>
              <button onClick={() => onDeletetReviewHandler(item.id)}>
                삭제
              </button>
            </StReviews>
          );
        })}
      </div>
    </div>
  );
}

export default MyReviewList;

const StReviews = styled.div`
  display: flex;
`;
