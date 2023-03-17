import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { addReview } from "../api/detail";
import { useCookies } from "react-cookie";

function Review({ id, queryClient }) {
  const [cookies] = useCookies(["access_token", "loginType"]);

  //평점
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  //후기 작성
  const [review, setReview] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState();

  const addReviewMutation = useMutation(addReview, {
    onSuccess: () => queryClient.invalidateQueries("getdetail"),
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (review.trim() === "" || !image) return alert("내용을 입력해주세요");
    const formData = new FormData();
    formData.append("review", review);
    formData.append("image", image);
    const payload = {
      id: id,
      review: review,
      image: image,
      star: clicked,
    };
    addReviewMutation.mutate(payload);
    alert("후기 작성 완료");
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
    <StReviewBox>
      {cookies.loginType === "USER" && (
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
          <input
            type="text"
            placeholder="후기를 작성해주세요"
            value={review}
            onChange={(event) => setReview(event.target.value)}
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
                //   <FontAwesomeIcon
                //     icon={`fa-solid fa-star ${
                //       (clicked >= el) | (hovered >= el) && "yellowStar"
                //     }`}
                //     key={el}
                //     onMouseEnter={() => setHovered(el)}
                //     onMouseLeave={() => setHovered(null)}
                //     onClick={() => setClicked(el)}
                //   />
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

          <button>후기 작성</button>
        </form>
      )}
    </StReviewBox>
  );
}

export default Review;

const StReviewBox = styled.div`
  border: 3px solid black;
  display: flex;
`;

const StImg = styled.img`
  width: 50px;
  height: 50px;
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
