import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addReview } from "../../../api/detail";
import { useCookies } from "react-cookie";
import foot from "../../../style/img/foot.svg";
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
  StPhotoBtn,
} from "./ReviewStyle";
import Button from "../../../element/Button";
import Swal from "sweetalert2";

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
    if (review.trim() === "")
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "후기를 작성해주세요.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
    if (!clicked)
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "평점을 입력해주세요.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>업체에 대한 후기를 작성해주세요</div>
                <StPhotoBtn onClick={onImgButton}>사진 추가하기</StPhotoBtn>
              </div>

              <StInputBox>
                <StInput
                  type="text"
                  placeholder="50자 이내로 작성해주세요."
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  maxLength={50}
                />
                <div>
                  <StImgBtn></StImgBtn>
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
                <Button size="reviewPost">등록하기</Button>
                <Button size="reviewPost" onClick={onToggle}>
                  취소하기
                </Button>
              </StBtns>
            </StForm>
          )}
        </StFormBox>
      </StBackGround>
    </StReviewBox>
  );
}

export default Review;
