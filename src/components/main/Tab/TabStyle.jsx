import styled from "styled-components";
import mainMid from "../../../style/img/mainMid.svg";

const StWrap = styled.div`
  background-image: url(${mainMid});
  background-size: 100% 990px;
  width: 100%;
  height: 800px;
  background-position: cover;
  background-repeat: no-repeat;
  z-index: 999;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 900px;
    margin-bottom: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 500px;
  }
`;

const StPlace = styled.div`
  display: flex;
  width: 1240px;
  height: 464px;
  margin: 0 auto;
  margin-bottom: 75px;
  gap: 15px;
  @media screen and (max-width: 767px) {
    width: 370px;
    gap: 15px;
    height: 300px;
    display: flex;
    flex-direction: column;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 630px;
    gap: 15px;
    height: 300px;
    display: flex;
  }
`;

const StMyPlace = styled.div`
  display: flex;
  width: 430px;
  margin: 0 auto;
  font-size: 46px;
  margin-bottom: 30px;
  font-weight: 900;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    width: 180px;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 20px;
    width: 180px;
    margin: 0 auto;
  }
`;

const StTabBox = styled.div`
  display: flex;
  gap: 170px;
  margin: 68px auto;
  width: 485px;
  @media screen and (max-width: 767px) {
    gap: 60px;
    margin: 40px auto;
    width: 200px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 60px;
    margin: 40px auto;
    width: 200px;
  }
`;

const StTabs = styled.div`
  width: 48px;
  height: 88px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    text-align: center;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    text-align: center;
  }
`;

const StTabText = styled.p`
  font-size: 20px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
  }
`;

const StTabImg = styled.img`
  width: 44.58px;
  height: 44.58px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: 0.2s;
  }
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
`;

const StCard = styled.div`
  width: 400px;
  cursor: pointer;
  position: relative;

  @media screen and (max-width: 767px) {
    width: 200px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 10px;
  }
`;

const StResizeImg = styled.img`
  width: 400px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(60%);
  }
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 150px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 0px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 150px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 0px;
  }
`;

const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 10px;
  @media screen and (max-width: 767px) {
    margin-top: 0px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-top: 0px;
  }
`;

const StTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 5px;
  color: #0d0d0d;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StText = styled.div`
  font-size: 13px;
  color: #725334;
  @media screen and (max-width: 767px) {
    font-size: 8px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 8px;
  }
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 6%;
  top: 0%;
  margin-top: -2px;
`;

const StPin = styled.img`
  margin-left: -100px;
  margin-top: 10px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
    margin-left: -50px;
    margin-top: 0px;
    position: absolute;
    left: 90%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 30px;
    height: 30px;
    margin-left: -50px;
    margin-top: 0px;
    position: absolute;
    left: 90%;
  }
`;

const StDivBox = styled.div`
  display: flex;
  width: 430px;
  margin: 0 auto;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 10px;
  }
`;

export {
  StWrap,
  StPlace,
  StMyPlace,
  StTabBox,
  StTabs,
  StTabText,
  StTabImg,
  StCard,
  StResizeImg,
  StTextBox,
  StTitle,
  StText,
  StDibBtn,
  StPin,
  StDivBox,
};
