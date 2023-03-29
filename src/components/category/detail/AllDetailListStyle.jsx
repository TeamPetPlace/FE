import styled from "styled-components";

const StContents = styled.div`
  height: 230px;
  display: flex;
  line-height: 230px;
  border-bottom: 1px solid #d9d9d9;
`;

const StSlider = styled.div`
  width: 1240px;
  height: 545px;
  overflow: hidden;
  position: relative;
`;

const StSliderImg = styled.img`
  width: 1240px;
  height: 545px;
`;

const StShare = styled.button`
  background-color: #ffd53f;
  border: none;
  border-radius: 60px;
  width: 60px;
  height: 60px;
  font-size: 30px;
  float: right;
  margin-top: 30px;
`;

const StFirst = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
`;

const StTitleName = styled.div`
  font-size: 34px;
  font-weight: 900;
  margin-right: 10px;
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
`;

const StAverage = styled.div`
  font-size: 16px;
  line-height: 60px;
`;

const StTime = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
`;

const StAddress = styled.div`
  font-size: 24px;
`;

const StClosedDay = styled.div`
  font-size: 20px;
  margin-left: 10px;
  color: #0d0d0d;
  border-left: 1px solid #0d0d0d;
  padding-left: 10px;
`;

const StTelNum = styled.div`
  font-size: 18px;
  margin-top: 7px;
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;

const StInformation = styled.div`
  height: 70px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 100px;
`;

const StInfoBox = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const StBold = styled.div`
  font-size: 22px;
  font-weight: 900;
  width: 120px;
`;

const StPlus = styled.div`
  font-size: 20px;
  margin-left: 15px;
`;

const StCopy = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  margin-top: 8px;
  margin-left: 8px;
  cursor: pointer;
`;

const StMap = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const StTabBtn = styled.button`
  width: 150px;
  height: 45px;
  font-size: 20px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 60px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
    border: 1px solid #d9d9d9;
  }
  &.selected {
    background-color: #ffd53f;
  }
`;

export {
  StContents,
  StSlider,
  StSliderImg,
  StShare,
  StFirst,
  StTitleName,
  StStar,
  StAverage,
  StTime,
  StAddress,
  StClosedDay,
  StTelNum,
  StContentsBox,
  StInformation,
  StInfoBox,
  StBold,
  StPlus,
  StCopy,
  StMap,
  StTabBtn,
};
