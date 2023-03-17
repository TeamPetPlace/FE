import React, { useRef, useState } from "react";
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
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState();

  //평점
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  const onEditMode = (reviewId) => {
    setEdit({ reviewId: reviewId, isEdit: !edit.isEdit });
  };

  const updateReviewMutation = useMutation(updateReview, {
    onSuccess: () => queryClient.invalidateQueries("getdetail"),
  });

  const onUpdateReviewHandler = (event, reviewId) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("review", updateReview);
    formData.append("image", image);
    const payload = {
      id: reviewId,
      review: updateReview,
      image: image,
      star: clicked,
    };
    updateReviewMutation.mutate(payload);
    alert("수정 완료");
    onEditMode(reviewId);
    setDetail([...detail]);
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
      {detail?.review?.map((item) => (
        <StReview key={item.id}>
          {edit.reviewId === item.id && edit.isEdit === true ? (
            <>
              <form
                onSubmit={onUpdateReviewHandler}
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
                    return <img src={item} alt="img" key={index} />;
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
