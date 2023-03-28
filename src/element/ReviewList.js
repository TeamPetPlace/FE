import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { instance } from "../api/axios";
import { deleteReview, getReview, updateReviews } from "../api/detail";
import MyReviewList from "../components/mypage/MyReviewList";

function ReviewList({ id, detail }) {
  const [cookies] = useCookies(["access_token", "email"]);
  const [checked, setChecked] = useState([true, false, false]);
  const [tab, setTab] = useState("all");

  const [review, setReview] = useState([]);

  //페이지네이션
  const [page, setPage] = useState(0);
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
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
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
      <StContentsBox>
        <div>
          <div>전체 리뷰수:{detail.reviewCount}</div>
          <div>평균평점:{detail.star}</div>
        </div>
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
        {review?.map((item) => (
          <StReview key={item.id}>
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
              <>
                {tab === "all" ? (
                  <>
                    <img src={item.memberImage} />
                    <div>
                      <div>{item.nickname}</div>
                      {(item.star === 1 && <div>★☆☆☆☆</div>) ||
                        (item.star === 2 && <div>★★☆☆☆</div>) ||
                        (item.star === 3 && <div>★★★☆☆</div>) ||
                        (item.star === 4 && <div>★★★★☆</div>) ||
                        (item.star === 5 && <div>★★★★★</div>)}
                    </div>
                    <div>{item.review}</div>
                    <div>{item.createdAt.slice(0, 10)}</div>
                    {item.image === null ? (
                      <img style={{ display: "none" }} />
                    ) : (
                      <StImg src={item.image} alt="img" />
                    )}

                    {cookies.email === item.email && (
                      <div>
                        <button onClick={() => onEditMode(item.id)}>
                          수정
                        </button>
                        <button onClick={() => onDeletetReviewHandler(item.id)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </>
                ) : tab === "photoReview" && item.image !== null ? (
                  <>
                    <div>{item.email}</div>
                    <div>{item.nickname}</div>
                    <div>{item.review}</div>
                    <div>{item.createdAt.slice(0, 10)}</div>
                    {item.image === null ? (
                      <img style={{ display: "none" }} />
                    ) : (
                      <StImg src={item.image} alt="img" />
                    )}

                    {(item.star === 1 && <div>★</div>) ||
                      (item.star === 2 && <div>★★</div>) ||
                      (item.star === 3 && <div>★★★</div>) ||
                      (item.star === 4 && <div>★★★★</div>) ||
                      (item.star === 5 && <div>★★★★★</div>)}
                    <div>{item.star}</div>
                    {cookies.email === item.email && (
                      <div>
                        <button onClick={() => onEditMode(item.id)}>
                          수정
                        </button>
                        <button onClick={() => onDeletetReviewHandler(item.id)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </>
                ) : null}
              </>
            )}
          </StReview>
        ))}
        <button disabled={page === 0} onClick={handlePrevPage}>
          이전페이지
        </button>
        <div>{page}</div>
        <button disabled={response?.length < size} onClick={handleNextPage}>
          다음페이지
        </button>
      </StContentsBox>
    </div>
  );
}

export default ReviewList;

const StPostBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 18px;
  color: #555;
  cursor: pointer;
  &:hover {
    color: black;
    text-decoration: underline;
  }
  &.selected {
    color: black;
    text-decoration: underline;
  }
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;

const StReview = styled.div`
  display: flex;
`;

const StImg = styled.img`
  width: 30px;
  height: 30px;
`;

const StReviewBox = styled.div`
  border: 3px solid black;
  display: flex;
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
