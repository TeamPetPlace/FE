import React from "react";
import { useCookies } from "react-cookie";
import reviewProfile from "../../../style/img/reviewProfile.svg";
import {
  StReviewBoxs,
  StProfile,
  StListBox,
  StNickBox,
  StReviewText,
  StDate,
  StNick,
  StStar,
  StImg,
  StBtn,
} from "./ReviewsStyle";

function Reviews({ item, onEditMode, onDeletetReviewHandler }) {
  const [cookies] = useCookies(["access_token", "email"]);

  const handleImageClick = (src) => {
    window.open(src);
  };
  return (
    <>
      <StReviewBoxs>
        <div style={{ display: "flex" }}>
          {item.memberImage === null ? (
            <StProfile src={reviewProfile} />
          ) : (
            <StProfile src={item.memberImage} />
          )}
          <StListBox>
            <StNickBox>
              <StNick>{item.nickname}</StNick>
              {(item.star === 1 && <StStar>★★☆☆☆</StStar>) ||
                (item.star === 2 && <StStar>★★☆☆☆</StStar>) ||
                (item.star === 3 && <StStar>★★★☆☆</StStar>) ||
                (item.star === 4 && <StStar>★★★★☆</StStar>) ||
                (item.star === 5 && <StStar>★★★★★</StStar>)}
              {cookies.email === item.email && (
                <div>
                  <StBtn onClick={() => onEditMode(item.id)}>수정</StBtn>
                  <StBtn onClick={() => onDeletetReviewHandler(item.id)}>
                    삭제
                  </StBtn>
                </div>
              )}
            </StNickBox>
            <StReviewText>{item.review}</StReviewText>
            <StDate>{item.createdAt.slice(0, 10)}</StDate>
          </StListBox>
        </div>
        <div>
          {item.image === null ? (
            <img style={{ display: "none" }} />
          ) : (
            <StImg
              src={item.image}
              alt="img"
              onClick={() => handleImageClick(item.image)}
            />
          )}
        </div>
      </StReviewBoxs>
    </>
  );
}

export default Reviews;
