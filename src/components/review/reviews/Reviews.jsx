import React from "react";
import { useCookies } from "react-cookie";
import reviewProfile from "../../../style/img/reviewProfile.svg";
import {
  StReviewBoxs,
  StBox,
  StProfile,
  StListBox,
  StNickBox,
  StReviewText,
  StDate,
  StNick,
  StStar,
  StImg,
} from "./ReviewsStyle";
import Swal from "sweetalert2";
import Button from "../../../element/Button";

function Reviews({ item, onEditMode, onDeletetReviewHandler }) {
  const [cookies] = useCookies(["AccessToken", "email"]);

  const onImageViewHandler = (image) => {
    Swal.fire({
      imageUrl: image,
      imageAlt: "Original Image",
      confirmButtonColor: "#FFD53F",
    });
  };

  return (
    <div>
      <StReviewBoxs>
        <StBox>
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
                  <Button size="smallGray" onClick={() => onEditMode(item.id)}>
                    수정
                  </Button>
                  <Button
                    size="smallGray"
                    onClick={() => onDeletetReviewHandler(item.id)}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </StNickBox>
            <StReviewText>{item.review}</StReviewText>
            <StDate>{item.createdAt.slice(0, 10)}</StDate>
          </StListBox>
        </StBox>
        <div>
          {item.image === null ? (
            <img style={{ display: "none" }} />
          ) : (
            <StImg
              src={item.image}
              alt="img"
              onClick={() => onImageViewHandler(item.image)}
            />
          )}
        </div>
      </StReviewBoxs>
    </div>
  );
}

export default Reviews;
