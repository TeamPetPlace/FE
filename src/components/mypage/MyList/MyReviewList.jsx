import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteReview, updateReviews } from "../../../api/detail";
import { getMyReview } from "../../../api/mypage";
import Pagination from "react-js-pagination";
import foot from "../../../style/img/foot.svg";
import plus from "../../../style/img/plus.svg";
import Button from "../../../element/Button";
import {
  StContents,
  StReview,
  StStarIcon,
  StPageDiv,
  StReviewBox,
  StBackGround,
  StFormBox,
  StForm,
  StTopBox,
  StTop,
  StMid,
  StInputBox,
  StInput,
  StImgBtn,
  StImgs,
  StStars,
  StBtns,
  PageBox,
  StReviews,
  StContainer,
  StAllReviewList,
  StReviewDiv,
  StReviewImgDiv,
  StReviewImg,
  StTitle,
  StTitleContainer,
  StStar,
} from "./MyListStyle";
import styled from "styled-components";

function MyReviewList() {
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  //페이지네이션
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalElement, setTotalElement] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
        setTotalElement(response.totalElements);
        setTotalPages(response.totalPages);
      },
    }
  );

  //페이지네이션
  const handlerPageChange = (page) => {
    setPage(page);
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
    if (!clicked) return alert("평점을 입력해주세요");
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
                      <StReviewBox>
                        <StBackGround>
                          <StFormBox>
                            <StForm
                              onSubmit={(event) => onUpdateReviewHandler(event, item.id)}
                              encType="multipart/form-data"
                            >
                              <StTopBox style={{ display: "flex" }}>
                                <StTop>후기 수정</StTop>
                                <img src={foot} style={{ width: "40px" }} />
                              </StTopBox>

                              <StMid>평점을 수정하고 싶으신가요?</StMid>
                              <StStars>
                                <div style={{ display: "flex" }}>
                                  {[1, 2, 3, 4, 5].map((el) => (
                                    <p
                                      key={el}
                                      onMouseEnter={() => setHovered(el)}
                                      onMouseLeave={() => setHovered(null)}
                                      onClick={() => setClicked(el)}
                                      value={clicked}
                                    >
                                      {`${(clicked >= el) | (hovered >= el) ? "★" : "☆"}`}
                                    </p>
                                  ))}
                                </div>
                              </StStars>
                              <div>업체에 대한 후기를 수정할 수 있습니다</div>
                              <StInputBox>
                                <StInput
                                  type="text"
                                  value={updateReview}
                                  onChange={(event) => setUpdateReview(event.target.value)}
                                  minLength={10}
                                  placeholder={item.review}
                                />
                                <div>
                                  <StImgBtn onClick={onImgButton}>
                                    <img src={plus} />
                                  </StImgBtn>
                                  <div>
                                    {imgView.length > 0 &&
                                      imgView.map((item, index) => {
                                        return <StImgs src={item} alt="img" key={index} />;
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
                                </div>
                              </StInputBox>
                              <StBtns>
                                <Button size="review">수정하기</Button>
                                <Button size="review" onClick={() => onEditMode(item.id)}>
                                  취소하기
                                </Button>
                              </StBtns>
                            </StForm>
                          </StFormBox>
                        </StBackGround>
                      </StReviewBox>
                    </>
                  ) : (
                    <StReviews key={item.id}>
                      {item.category === "병원" && (
                        <>
                          <StReviewImgDiv>
                            <StReviewImg
                              onClick={() => navigate(`/hospital/${item.postId}`)}
                              src={item.image}
                            />
                          </StReviewImgDiv>
                          <div
                            style={{ width: "580px", cursor: "pointer" }}
                            onClick={() => navigate(`/hospital/${item.postId}`)}
                          >
                            <StTitleContainer>
                              <StTitle>{item.nickname}</StTitle>
                              <StStar>
                                {(item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                                  (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                                  (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                                  (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                                  (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                              </StStar>
                            </StTitleContainer>
                            <StReview>{item.review}</StReview>
                            <StContainer>
                              <StContents>{item.modifiedAt.split("T", 1)}</StContents>
                              <StContents>{item.title}</StContents>
                            </StContainer>
                          </div>
                        </>
                      )}
                      {item.category === "미용" && (
                        <>
                          <StReviewImgDiv>
                            <StReviewImg
                              onClick={() => navigate(`/shop/${item.postId}`)}
                              src={item.image}
                            />
                          </StReviewImgDiv>
                          <div
                            style={{ width: "580px", cursor: "pointer" }}
                            onClick={() => navigate(`/shop/${item.postId}`)}
                          >
                            <StTitleContainer>
                              <StTitle>{item.nickname}</StTitle>
                              <StStar>
                                {(item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                                  (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                                  (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                                  (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                                  (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                              </StStar>
                            </StTitleContainer>
                            <StReview>{item.review}</StReview>
                            <StContainer>
                              <StContents>{item.modifiedAt.split("T", 1)}</StContents>
                              <StContents>{item.title}</StContents>
                            </StContainer>
                          </div>
                        </>
                      )}
                      {item.category === "카페" && (
                        <>
                          <StReviewImgDiv>
                            <StReviewImg
                              onClick={() => navigate(`/cafe/${item.postId}`)}
                              src={item.image}
                            />
                          </StReviewImgDiv>
                          <div
                            style={{ width: "580px", cursor: "pointer" }}
                            onClick={() => navigate(`/cafe/${item.postId}`)}
                          >
                            <StTitleContainer>
                              <StTitle>{item.nickname}</StTitle>
                              <StStar>
                                {(item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                                  (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                                  (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                                  (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                                  (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                              </StStar>
                            </StTitleContainer>
                            <StReview>{item.review}</StReview>
                            <StContainer>
                              <StContents>{item.modifiedAt.split("T", 1)}</StContents>
                              <StContents>{item.title}</StContents>
                            </StContainer>
                          </div>
                        </>
                      )}
                      <div style={{ margin: "35px 0" }}>
                        <Button size="reviewGray" onClick={() => onEditMode(item.id)}>
                          수정
                        </Button>
                        <Button size="reviewGray" onClick={() => onDeletetReviewHandler(item.id)}>
                          삭제
                        </Button>
                      </div>
                    </StReviews>
                  )}
                </div>
              </StReviewDiv>
            );
          })}
      </StAllReviewList>
      <StPageDiv>
        <PageBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={totalElement}
            pageRangeDisplayed={totalPages}
            onChange={handlerPageChange}
          />
        </PageBox>
      </StPageDiv>
    </div>
  );
}

export default MyReviewList;
