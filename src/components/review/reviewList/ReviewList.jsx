import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteReview, getReview, updateReviews } from "../../../api/detail";
import Pagination from "react-js-pagination";
import Reviews from "../reviews/Reviews";
import Review from "../reviewPost/Review";
import foot from "../../../style/img/foot.svg";
import plus from "../../../style/img/plus.svg";
import { useCookies } from "react-cookie";
import {
  StPostBtn,
  StContentsBox,
  StReview,
  PageBox,
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
  StImg,
  StStar,
  StBtns,
  StBtn,
  StReviewBtn,
  StCount,
  StTopReviewBox,
  StPageBox,
} from "./ReviewListStyle";

function ReviewList({ id, detail }) {
  const [cookies] = useCookies(["AccessToken", "loginType"]);
  const [checked, setChecked] = useState([true, false, false]);
  const [tab, setTab] = useState("all");

  const [review, setReview] = useState([]);

  //페이지네이션
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const response = useQuery(
    [
      "getReview",
      {
        id: id,
        page: page,
        size: size,
      },
    ],
    () =>
      getReview({
        id: id,
        page: page,
        size: size,
      }),
    {
      onSuccess: (response) => {
        setReview(response.content);
      },
    }
  );

  //페이지네이션
  const handlerPageChange = (page) => {
    setPage(page);
  };

  const reviewTabList = [
    { id: 0, text: "전체후기", category: "all" },
    { id: 1, text: "사진후기", category: "photoReview" },
  ];

  const reviewClickHandler = (i) => {
    const newArr = Array(reviewTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("all");
    } else if (i === 1) {
      setTab("photoReview");
    }
  };

  //후기 삭제
  const queryClient = useQueryClient();
  const deleteReviewMutation = useMutation(deleteReview, {
    onSuccess: () => queryClient.invalidateQueries("getReview"),
  });

  const onDeletetReviewHandler = (reviewId) => {
    const message = window.confirm("후기를 삭제하시겠습니까?");
    if (message) {
      deleteReviewMutation.mutate(reviewId);
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
    onSuccess: () => queryClient.invalidateQueries("getReview"),
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

  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <StContentsBox>
        <div style={{ marginBottom: "30px" }}>
          <StTopReviewBox>
            <StCount>전체 리뷰수:{detail.reviewCount}</StCount>
            {cookies.loginType === "USER" && (
              <StReviewBtn onClick={onToggle}>작성하기</StReviewBtn>
            )}
          </StTopReviewBox>
          {open && <Review id={id} onToggle={onToggle} />}
          <div>
            {reviewTabList?.map((item, i) => (
              <StPostBtn
                key={i}
                checked={checked[i]}
                onClick={() => reviewClickHandler(i)}
                className={checked[i] ? "selected" : ""}
              >
                {item.text}
              </StPostBtn>
            ))}
          </div>
        </div>
        {review?.map((item) => (
          <StReview key={item.id}>
            {edit.reviewId === item.id && edit.isEdit === true ? (
              <>
                <StReviewBox>
                  <StBackGround>
                    <StFormBox>
                      {cookies.loginType === "USER" && (
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
                          <StStar>
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
                          </StStar>
                          <div>업체에 대한 후기를 수정할 수 있습니다</div>
                          <StInputBox>
                            <StInput
                              type="text"
                              value={updateReview}
                              onChange={(event) =>
                                setUpdateReview(event.target.value)
                              }
                              minLength={50}
                              placeholder={item.review}
                              maxLength={50}
                            />
                            <div>
                              <StImgBtn onClick={onImgButton}>
                                <img src={plus} />
                              </StImgBtn>
                              <div>
                                {imgView.length > 0 &&
                                  imgView.map((item, index) => {
                                    return (
                                      <StImg src={item} alt="img" key={index} />
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
                            <StBtn>수정하기</StBtn>
                            <StBtn onClick={() => onEditMode(item.id)}>
                              취소하기
                            </StBtn>
                          </StBtns>
                        </StForm>
                      )}
                    </StFormBox>
                  </StBackGround>
                </StReviewBox>
              </>
            ) : (
              <>
                {tab === "all" ? (
                  <Reviews
                    item={item}
                    onEditMode={onEditMode}
                    onDeletetReviewHandler={onDeletetReviewHandler}
                  />
                ) : tab === "photoReview" && item.image !== null ? (
                  <Reviews
                    item={item}
                    onEditMode={onEditMode}
                    onDeletetReviewHandler={onDeletetReviewHandler}
                  />
                ) : null}
              </>
            )}
          </StReview>
        ))}
      </StContentsBox>
      <StPageBox
        style={{
          width: "1243px",
          height: "100px",
          position: "relative",
        }}
      >
        <PageBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={40}
            pageRangeDisplayed={5}
            onChange={handlerPageChange}
          />
        </PageBox>
      </StPageBox>
    </div>
  );
}

export default ReviewList;
