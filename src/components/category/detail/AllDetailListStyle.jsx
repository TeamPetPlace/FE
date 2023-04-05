import styled from "styled-components";

const StContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const StContents = styled.div`
  height: 230px;
  display: flex;
  padding-top: 40px;
  /* line-height: 230px; */
  border-bottom: 1px solid #d9d9d9;
  @media screen and (max-width: 768px) {
    line-height: 150px;
    height: 150px;
  }
`;

const StSlider = styled.div`
  width: 1240px;
  height: 545px;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 350px;
    height: 400px;
    display: flex;
    margin-left: 13px;
    margin-top: -70px;
    align-items: center;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 700px;
    height: 400px;
    display: flex;
    margin: 0px 30px;
    margin-top: -50px;
    align-items: center;
  }
`;

const StSliderImg = styled.img`
  width: 1240px;
  height: 545px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    height: 300px;
  }
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

  @media screen and (max-width: 767px) {
    width: 45px;
    height: 45px;
    margin-right: 71%;
    margin-top: -2%;
    float: right;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 45px;
    height: 45px;
    margin-right: 41%;
    margin-top: -2%;
    float: right;
  }
`;

const StFirst = styled.div`
  display: flex;
  width: 1000px;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-top: -30px;
    margin-bottom: -5px;
  }
`;

const StTitleName = styled.div`
  font-size: 34px;
  font-weight: 900;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const StStar = styled.div`
  color: #ffd53f;
  font-size: 25px;
  margin-right: 5px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const StAverage = styled.div`
  font-size: 16px;
  line-height: 60px;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const StTime = styled.div`
  display: flex;
  height: 30px;
  line-height: 30px;
  @media screen and (max-width: 768px) {
    margin-top: -20px;
  }
`;

const StAddressBox = styled.div`
  display: flex;
  position: relative;
`;

const StAddress = styled.div`
  font-size: 24px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const StClosedDay = styled.div`
  font-size: 20px;
  margin-left: 10px;
  color: #0d0d0d;
  border-left: 1px solid #0d0d0d;
  padding-left: 10px;
  @media screen and (max-width: 768px) {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
  }
`;

const StTelNum = styled.div`
  font-size: 18px;
  margin-top: 7px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    font-size: 12px;
    margin-top: -5px;
  }
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;

  @media screen and (max-width: 767px) {
    width: 300px;
    font-size: 15px;
    height: 800px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 700px;
    height: 900px;
  }
`;

const StInformation = styled.div`
  height: 70px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 100px;
  @media screen and (max-width: 768px) {
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
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const StPlus = styled.div`
  font-size: 20px;
  margin-left: 15px;
  @media screen and (max-width: 768px) {
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
    margin-top: -5px;
  }
`;

const StMap = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
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
  @media screen and (max-width: 768px) {
    font-size: 15px;
    width: 180px;
  }
`;

export {
  StContainer,
  StContents,
  StSlider,
  StSliderImg,
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
};
