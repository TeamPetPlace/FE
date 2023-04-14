import styled from "styled-components";

const StContainer = styled.div`
  width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    width: 350px;
    margin-top: -40px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 900px;
  }
`;

const StContents = styled.div`
  height: 230px;
  display: flex;
  padding-top: 40px;
  border-bottom: 1px solid #d9d9d9;
`;

const StSlider = styled.div`
  width: 1040px;
  height: 560px;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 350px;
    height: 300px;
    display: flex;
    margin: 0 auto;
    align-items: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 900px;
    height: 400px;
    display: flex;
    margin: 0px auto;
    align-items: center;
  }
`;

const StSliderImg = styled.img`
  width: 1040px;
  height: 560px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    height: 300px;
  }
`;

const StThumbnail = styled.img`
  width: 200px;
  height: 140px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 75px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100px;
    height: 100px;
  }
`;

const StShare = styled.button`
  background-color: #ffd53f;
  border: none;
  border-radius: 60px;
  width: 60px;
  height: 60px;
  font-size: 30px;
  color: #000;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
    font-size: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 45px;
    height: 45px;
  }
`;

const StFirst = styled.div`
  display: flex;
  width: 1000px;
  height: 50px;
  line-height: 50px;
  @media screen and (max-width: 767px) {
    width: 350px;
    height: 100px;
    gap: -40px;
    display: flex;
    flex-direction: column;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StTitleName = styled.div`
  font-size: 34px;
  font-weight: 900;
  margin-right: 10px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-bottom: -30px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 25px;
  }
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-bottom: -30px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }
`;

const StAverage = styled.div`
  font-size: 16px;
  line-height: 60px;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
  }
`;

const StTime = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
  @media screen and (max-width: 767px) {
    margin-top: -20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-top: 0px;
  }
`;

const StAddressBox = styled.div`
  display: flex;
  position: relative;
`;

const StAddress = styled.div`
  font-size: 24px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    margin-bottom: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }
`;

const StClosedDay = styled.div`
  font-size: 20px;
  margin-left: 10px;
  color: #0d0d0d;
  border-left: 1px solid #0d0d0d;
  padding-left: 10px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
  }
`;

const StTelNum = styled.div`
  font-size: 18px;
  margin-top: 7px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    margin-top: -5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    margin-top: 0px;
  }
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;

  @media screen and (max-width: 767px) {
    width: 290px;
    font-size: 15px;
    height: 1000px;
    margin: 0 auto;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 840px;
    height: 1000px;
    margin: 0 auto;
  }
`;

const StInformation = styled.div`
  height: 70px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 100px;
  @media screen and (max-width: 767px) {
    margin-bottom: 60px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 60px;
  }
`;

const StInfoBox = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const StBold = styled.div`
  font-size: 22px;
  font-weight: 900;
  width: 120px;
  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 18px;
  }
`;

const StPlus = styled.div`
  font-size: 20px;
  margin-left: 15px;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StCopy = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  margin-top: 8px;
  margin-left: 8px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 15px;
    margin-left: -5px;
    margin-top: -5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    margin-left: -5px;
    margin-top: 0px;
  }
`;

const StMap = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 25px;
  }
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
  @media screen and (max-width: 767px) {
    font-size: 14px;
    width: 90px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
    width: 160px;
  }
`;

const StMoveTopBtn = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 99;
  bottom: 25%;
  right: 9%;
  width: 55px;
  height: 90px;
  border-radius: 60px;
  padding: 5px 0;
  align-items: center;
  background-color: #ffd53f;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media screen and (max-width: 767px) {
    width: 40px;
    height: 70px;
    right: 3%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 50px;
    height: 80px;
    right: 3%;
  }
`;

const StIconBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 25px;
  }
`;

export {
  StContainer,
  StContents,
  StSlider,
  StSliderImg,
  StThumbnail,
  StShare,
  StFirst,
  StAddressBox,
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
  StMoveTopBtn,
  StIconBtn,
};
