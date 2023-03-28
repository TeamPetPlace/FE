import styled from "styled-components";

const StReviewBoxs = styled.div`
  display: flex;
  width: 1140px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StProfile = styled.img`
  width: 108px;
  height: 108px;
  border-radius: 80px;
`;

const StListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 30px;
`;

const StNickBox = styled.div`
  display: flex;
`;

const StReviewText = styled.div`
  font-size: 20px;
  color: #555;
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

export {
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
