import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import styled from "styled-components";
import { deleteReview, updateReview } from "../api/detail";

function ReviewList({ id, queryClient, detail, setDetail }) {
  const [cookies] = useCookies(["access_token", "email"]);

  //후기 삭제
  const deleteReviewMutation = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries("getdetail"),
  });

  const onDeletetReviewHandler = (reviewId) => {
    const message = window.confirm("후기를 삭제하시겠습니까?");
    if (message) {
      deleteReviewMutation.mutate(reviewId);
      setDetail([...detail]);
    } else {
      return;
    }
  };

  //후기 수정
  const [edit, setEdit] = useState({ reviewId: 0, isEdit: false });
  const [updateReview, setUpdateReview] = useState("");
  const [image, setImage] = useState([]);
  const onEditMode = (reviewId) => {
    setEdit({ reviewId: reviewId, isEdit: !edit.isEdit });
  };

  const updateReviewMutation = useMutation(updateReview, {
    onSuccess: () => queryClient.invalidateQueries("getdetail"),
  });

  const onUpdateReviewHandler = (event, reviewId) => {
    event.preventDefault();
    updateReviewMutation.mutate(reviewId);
    onEditMode(reviewId);
    setDetail([...detail, updateReview]);
  };

  return (
    <div>
      {detail?.review?.map((item) => (
        <StReview key={item.id}>
          {edit.reviewId === item.id && edit.isEdit === true ? (
            <></>
          ) : (
            <>
              <div>{item.email}</div>
              <div>{item.nickname}</div>
              <div>{item.review}</div>
              <StImg src={item.image} alt="img" />
              {(item.star === 1 && <div>★</div>) ||
                (item.star === 2 && <div>★★</div>) ||
                (item.star === 3 && <div>★★★</div>) ||
                (item.star === 4 && <div>★★★★</div>) ||
                (item.star === 5 && <div>★★★★★</div>)}
              <div>{item.star}</div>
              {cookies.email === item.email && (
                <div>
                  <button onClick={() => onEditMode(item.id)}>수정</button>
                  <button onClick={() => onDeletetReviewHandler(item.id)}>
                    삭제
                  </button>
                </div>
              )}
            </>
          )}
        </StReview>
      ))}
    </div>
  );
}

export default ReviewList;

const StReview = styled.div`
  display: flex;
`;

const StImg = styled.img`
  width: 30px;
  height: 30px;
`;
