import styled from "styled-components";

const StReviewBoxs = styled.div`
  display: flex;
  width: 1140px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 160px;

  @media screen and (max-width: 767px) {
    width: 300px;
    height: 100px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 840px;
    height: 100px;
  }
`;

const StBox = styled.div`
  display: flex;
`;

const StProfile = styled.img`
  width: 108px;
  height: 108px;
  border-radius: 80px;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 50px;
    height: 50px;
  }
`;

const StListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 30px;
  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }
`;

const StNickBox = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    display: flex;
  }
`;

const StReviewText = styled.div`
  font-size: 20px;
  color: #555;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StDate = styled.div`
  font-size: 14px;
  color: #999;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StNick = styled.div`
  font-size: 24px;
  margin-right: 10px;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }
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

  @media screen and (max-width: 767px) {
    width: 100px;
    height: 80px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 100px;
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

  @media screen and (max-width: 767px) {
    font-size: 3px;
    width: 40px;
    height: 20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    width: 40px;
  }
`;

export {
  StBox,
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
};
