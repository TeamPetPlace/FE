import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteReview, updateReviews } from "../../api/detail";
import { getMyReview } from "../../api/mypage";
import { StContent, StReview, StStarIcon } from "./MypageStyle";
import Pagination from "react-js-pagination";
import foot from "../../style/img/foot.svg";
import plus from "../../style/img/plus.svg";

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
                              onSubmit={(event) =>
                                onUpdateReviewHandler(event, item.id)
                              }
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
                                      {`${
                                        (clicked >= el) | (hovered >= el)
                                          ? "★"
                                          : "☆"
                                      }`}
                                    </p>
                                  ))}
                                </div>
                              </StStars>
                              <div>업체에 대한 후기를 수정할 수 있습니다</div>
                              <StInputBox>
                                <StInput
                                  type="text"
                                  value={updateReview}
                                  onChange={(event) =>
                                    setUpdateReview(event.target.value)
                                  }
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
                                        return (
                                          <StImgs
                                            src={item}
                                            alt="img"
                                            key={index}
                                          />
                                        );
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
                                <StBtnn>수정하기</StBtnn>
                                <StBtnn onClick={() => onEditMode(item.id)}>
                                  취소하기
                                </StBtnn>
                              </StBtns>
                            </StForm>
                          </StFormBox>
                        </StBackGround>
                      </StReviewBox>
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
                        <StTitle>
                          {item.nickname}
                          {(item.star === 1 && (
                            <StStarIcon>★☆☆☆☆</StStarIcon>
                          )) ||
                            (item.star === 2 && (
                              <StStarIcon>★★☆☆☆</StStarIcon>
                            )) ||
                            (item.star === 3 && (
                              <StStarIcon>★★★☆☆</StStarIcon>
                            )) ||
                            (item.star === 4 && (
                              <StStarIcon>★★★★☆</StStarIcon>
                            )) ||
                            (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                        </StTitle>
                        <StReview>{item.review}</StReview>
                        <StContainer>
                          <StContent>{item.modifiedAt.split("T", 1)}</StContent>
                          <StContent>{item.title}</StContent>
                        </StContainer>
                      </div>
                      <div style={{ margin: "35px 0" }}>
                        <StBtn onClick={() => onEditMode(item.id)}>수정</StBtn>
                        <StBtn onClick={() => onDeletetReviewHandler(item.id)}>
                          삭제
                        </StBtn>
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
            totalItemsCount={40}
            pageRangeDisplayed={5}
            onChange={handlerPageChange}
          />
        </PageBox>
      </StPageDiv>
    </div>
  );
}

export default MyReviewList;

const StPageDiv = styled.div`
  width: 978px;
  height: 100px;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
    height: 80px;
  }
`;

const StReviewBox = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: white;
  @media screen and (max-width: 767px) {
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.523);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
`;

const StFormBox = styled.div`
  border-radius: 10px;
  display: flex;
  width: 800px;
  height: 650px;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 767px) {
    width: 320px;
    height: 400px;
    padding: 1rem;
  }
`;

const StForm = styled.form`
  width: 700px;
  height: 600px;
  margin: auto auto;
`;

const StTopBox = styled.div`
  display: flex;
  margin: 40px 0px;
`;

const StTop = styled.div`
  font-size: 40px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const StMid = styled.div`
  font-size: 24px;
  color: #555;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`;

const StInputBox = styled.div`
  height: 180px;
  display: flex;
  margin: auto 0;
  position: relative;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    width: 320px;
  }
`;

const StInput = styled.textarea`
  width: 550px;
  height: 130px;
  margin-right: 20px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  outline: none;
  padding: 10px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 80px;
  }
`;

const StImgBtn = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const StImgs = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  position: absolute;
  top: 0%;
`;

const StStars = styled.div`
  font-size: 70px;
  margin-top: -80px;
  margin-bottom: -40px;
  color: #ffd53f;
  cursor: pointer;
  display: flex;
  @media screen and (max-width: 767px) {
    font-size: 30px;
    margin-top: -30px;
    margin-bottom: -10px;
  }
`;

const StBtns = styled.div`
  margin: 25px auto;
  width: 420px;
  @media screen and (max-width: 767px) {
    width: 220px;
    margin: 0 auto;
    margin-top: -50px;
  }
`;

const StBtnn = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid #d9d9d9;
  background-color: transparent;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
    font-size: 12px;
    height: 30px;
  }
`;

const PageBox = styled.div`
  position: absolute;
  left: 35%;
  top: 0%;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    @media screen and (max-width: 767px) {
      margin-top: 200px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin-top: 180px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: none;
    @media screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #5e5e5e;
    font-size: 1rem;
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      font-size: 15px;
    }
  }
  ul.pagination li.active a {
    color: black;
  }
  ul.pagination li.active {
    background-color: #fffbe3;
    color: black;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: black;
  }
  @media screen and (max-width: 767px) {
    left: 18%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 30%;
  }
`;

const StReviews = styled.div`
  display: flex;
  margin: auto;
`;

const StContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    width: 100px;
  }
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
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 320px;
    margin: 20px 30px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 560px;
    margin: 50px 30px;
  }
`;

const StReviewDiv = styled.div`
  width: 918px;
  height: 190px;
  /* background-color: skyblue; */
  margin: 0;
  border-bottom: 3px solid #f0f0f0;
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 110px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 300px;
  }
`;

const StReviewImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid transparent;
  margin: 30px 20px 10px 5px;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
    margin: 30px 10px 10px 5px;
    border-radius: 5px;
  }
`;

const StBtn = styled.button`
  font-size: 14px;
  width: 68px;
  height: 30px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin-right: 10px;
  margin-left: 10px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
  @media screen and (max-width: 767px) {
    font-size: 8px;
    width: 40px;
    height: 25px;
    margin-left: 5px;
    margin-top: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    width: 60px;
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-top: 35px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 13px;
    margin-top: 20px;
  }
`;
