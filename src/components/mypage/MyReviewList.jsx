import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteReview, getDetail, updateReviews } from "../../api/detail";
import { getMyReview } from "../../api/mypage";
import { StContent, StStarIcon } from "./MypageStyle";

function MyReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  //페이지네이션
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const { data } = useQuery(
    [
      "getMyReview",
      {
        page: page,
        size: size,
      },
    ],
    () =>
      getMyReview({
        page: page,
        size: size,
      }),
    {
      onSuccess: (response) => {
        setReviewList(response.content);
      },
    }
  );

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

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

  //후기 수정
  const [edit, setEdit] = useState({ reviewId: 0, isEdit: false });
  const [updateReview, setUpdateReview] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState([]);

  //평점
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  const onEditMode = (reviewId) => {
    setEdit({ reviewId: reviewId, isEdit: !edit.isEdit });
    console.log(reviewId);
  };

  const updateReviewMutation = useMutation(updateReviews, {
    onSuccess: () => queryClient.invalidateQueries("getMyReview"),
  });

  const onUpdateReviewHandler = (event, reviewId) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("review", updateReview);
    formData.append("image", image);
    const payload = {
      reviewId,
      review: updateReview,
      image: image,
      star: clicked,
    };
    console.log(reviewId);
    updateReviewMutation.mutate(payload);
    alert("수정 완료");
    // setDetail([...detail, updateReview]);
    onEditMode(reviewId);
  };

  //이미지 미리보기
  const fileInput = useRef(null);

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const onImgHandler = (event) => {
    setImgView([]);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        setImage(event.target.files[i]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base = reader.result;
          if (base) {
            const baseSub = base.toString();
            setImgView((imgView) => [...imgView, baseSub]);
          }
        };
      }
    }
  };

  return (
    <div>
      <StAllReviewList>
        {reviewList !== [] &&
          reviewList?.map((item) => {
            return (
              <StReviewDiv key={item.id}>
                <div>
                  {edit.reviewId === item.id && edit.isEdit === true ? (
                    <>
                      <form
                        onSubmit={(event) => onUpdateReviewHandler(event, item.id)}
                        encType="multipart/form-data"
                      >
                        <input
                          type="text"
                          placeholder="후기를 작성해주세요"
                          value={updateReview}
                          onChange={(event) => setUpdateReview(event.target.value)}
                        />
                        <button onClick={onImgButton}>이미지 업로드</button>
                        <div>
                          {imgView.map((item, index) => {
                            return <StImg src={item} alt="img" key={index} />;
                          })}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id="fileUpload"
                          style={{ display: "none" }}
                          ref={fileInput}
                          onChange={onImgHandler}
                        />
                        <StStar>
                          <p>평점</p>
                          <div style={{ display: "flex" }}>
                            {[1, 2, 3, 4, 5].map((el) => (
                              <p
                                key={el}
                                onMouseEnter={() => setHovered(el)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setClicked(el)}
                                value={clicked}
                              >{`${(clicked >= el) | (hovered >= el) && "★"}`}</p>
                            ))}
                          </div>
                        </StStar>
                        <button>수정</button>
                        <button onClick={() => onEditMode(item.id)}>취소</button>
                      </form>
                    </>
                  ) : (
                    <StReviews key={item.id}>
                      {item.category === "병원" && (
                        <StReviewImg
                          onClick={() => navigate(`/hospital/${item.postId}`)}
                          src={item.image}
                        />
                      )}
                      {item.category === "미용" && (
                        <StReviewImg
                          onClick={() => navigate(`/cafe/${item.postId}`)}
                          src={item.image}
                        />
                      )}
                      {item.category === "카페" && (
                        <StReviewImg
                          onClick={() => navigate(`/cafe/${item.postId}`)}
                          src={item.image}
                        />
                      )}
                      <div style={{ width: "580px" }}>
                        <StTitle fontSize="20px">
                          {item.nickname}
                          {(item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                            (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                            (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                            (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                            (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                        </StTitle>
                        <div style={{ padding: "10px 0" }}>{item.review}</div>
                        <StContainer Width="200px">
                          <StContent>{item.modifiedAt.split("T", 1)}</StContent>
                          <StContent>{item.title}</StContent>
                        </StContainer>
                      </div>
                      <div style={{ margin: "35px 0" }}>
                        <StBtn onClick={() => onEditMode(item.id)}>수정</StBtn>
                        <StBtn onClick={() => onDeletetReviewHandler(item.id)}>삭제</StBtn>
                      </div>
                    </StReviews>
                  )}
                </div>
              </StReviewDiv>
            );
          })}
      </StAllReviewList>
      <button disabled={page === 0} onClick={handlePrevPage}>
        이전페이지
      </button>
      <button disabled={data?.length < size} onClick={handleNextPage}>
        다음페이지
      </button>
    </div>
  );
}

export default MyReviewList;

const StReviews = styled.div`
  display: flex;
  margin: auto;
`;

const StImg = styled.img`
  width: 30px;
  height: 30px;
`;

const StContainer = styled.div`
  width: ${(props) => props.Width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StStar = styled.div`
  font-size: 20px;
  cursor: pointer;
  display: flex;
  font-size: 20px;

  i {
    margin: 20px 10px 20px 0;
    opacity: 0.1;
    cursor: pointer;
    font-size: 50px;
  }

  .yellowStar {
    color: orange;
    opacity: 1;
  }
`;

const StAllReviewList = styled.div`
  width: 918px;
  height: 880px;
  margin: 55px 30px;
  display: flex;
  flex-direction: column;
  /* background-color: yellowgreen; */
`;

const StReviewDiv = styled.div`
  width: 918px;
  height: 190px;
  /* background-color: skyblue; */
  margin: 0 0 0 0;
  border-bottom: 3px solid #f0f0f0;
`;

const StReviewImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid transparent;
  margin: 30px 20px 10px 5px;
  border-radius: 10px;
  cursor: pointer;
`;

const StBtn = styled.button`
  font-size: 14px;
  width: 68px;
  height: 30px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin-right: 10px;
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  margin-top: 35px;
  cursor: pointer;
`;
