import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addReview } from "../../../api/detail";
import { useCookies } from "react-cookie";
import foot from "../../../style/img/foot.svg";
import plus from "../../../style/img/plus.svg";
import {
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
} from "./ReviewStyle";

function Review({ id, onToggle }) {
  const [cookies] = useCookies(["AccessToken", "loginType"]);

  //평점
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  //후기 작성
  const [review, setReview] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState(null);

  const queryClient = useQueryClient();
  const addReviewMutation = useMutation(addReview, {
    onSuccess: () => queryClient.invalidateQueries("getReview"),
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (review.trim() === "") return alert("내용을 입력해주세요");
    if (!clicked) return alert("평점을 입력해주세요");
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
    setReview("");
    setImgView("");
    setImage("");
    setClicked(null);
    onToggle();
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
      <StBackGround>
        <StFormBox>
          {cookies.loginType === "USER" && (
            <StForm onSubmit={onSubmitHandler} encType="multipart/form-data">
              <StTopBox>
                <StTop>후기 작성</StTop>
                <img src={foot} style={{ width: "40px" }} />
              </StTopBox>

              <StMid>업체가 마음에 드시나요?</StMid>
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
                      {`${(clicked >= el) | (hovered >= el) ? "★" : "☆"}`}
                    </p>
                  ))}
                </div>
              </StStar>
              <div>업체에 대한 후기를 작성해주세요</div>
              <StInputBox>
                <StInput
                  type="text"
                  placeholder="최소 10자 이상 작성해주세요"
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  minLength={10}
                />
                <div>
                  <StImgBtn onClick={onImgButton}>
                    <img src={plus} />
                  </StImgBtn>
                  <div>
                    {imgView.length > 0 &&
                      imgView.map((item, index) => {
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
                </div>
              </StInputBox>
              <StBtns>
                <StBtn>등록하기</StBtn>
                <StBtn onClick={onToggle}>취소하기</StBtn>
              </StBtns>
            </StForm>
          )}
        </StFormBox>
      </StBackGround>
    </StReviewBox>
  );
}

export default Review;
