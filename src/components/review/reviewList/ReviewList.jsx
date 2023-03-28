import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { deleteReview, getReview, updateReviews } from "../../../api/detail";
import Pagination from "react-js-pagination";
import Reviews from "../reviews/Reviews";
import Review from "../../../element/Review";

function ReviewList({ id, detail }) {
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

  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <StContentsBox>
        <div>
          <div>전체 리뷰수:{detail.reviewCount}</div>
          <button onClick={onToggle}>작성하기</button>
        </div>
        {open && <Review />}
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
                  <StNickBox>
                    <StNick>{item.nickname}</StNick>
                    <StStar style={{ display: "flex" }}>
                      {[1, 2, 3, 4, 5].map((el) => (
                        <p
                          key={el}
                          onMouseEnter={() => setHovered(el)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => setClicked(el)}
                          value={clicked}
                        >{`${(clicked >= el) | (hovered >= el) && "★"}`}</p>
                      ))}
                    </StStar>
                  </StNickBox>
                  <input
                    type="text"
                    placeholder="후기를 작성해주세요"
                    value={updateReview}
                    onChange={(event) => setUpdateReview(event.target.value)}
                  />
                  <StDate>{item.createdAt.slice(0, 10)}</StDate>
                  <StBtn>수정</StBtn>
                  <StBtn onClick={() => onEditMode(item.id)}>취소</StBtn>
                </form>
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
        <PageBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={40}
            pageRangeDisplayed={5}
            onChange={handlerPageChange}
          />
        </PageBox>
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
  width: 1140px;
  display: flex;
`;

const StNickBox = styled.div`
  display: flex;
`;

const StDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const StNick = styled.div`
  font-size: 24px;
  margin-right: 10px;
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
`;

const StImg = styled.img`
  width: 270px;
  height: 160px;
  border-radius: 10px;
  float: left;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StBtn = styled.button`
  width: 70px;
  height: 30px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  font-size: 14px;
  background-color: transparent;
  margin-right: 10px;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const PageBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
