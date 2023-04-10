import styled from "styled-components";
import profileOrigin from "../../style/img/profile.svg";

const StMypageLayout = styled.div`
  width: 100%;
  height: 1900px;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 900px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 1450px;
  }
`;

const StTabBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 130px auto 0 auto;
`;

const StContentBox = styled.div`
  width: 978px;
  height: 1080px;
  background-color: white;
  border: 1px solid #d9d9d9;
  display: flex;
  margin: -2px auto 0 auto;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 600px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
    height: 860px;
  }
`;

const StTabBtn = styled.button`
  width: 490px;
  height: 54px;
  font-size: 22px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px 10px 0 0;
  text-align: center;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
    border: 1px solid #d9d9d9;
    font-weight: bold;
  }
  &.selected {
    background-color: #ffd53f;
    border: 1px solid #ffd53f;
    font-weight: bold;
  }
  @media screen and (max-width: 767px) {
    width: 151px;
    height: 35px;
    font-size: 13px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 330px;
    height: 45px;
    font-size: 18px;
  }
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  /* margin-bottom: 5px; */
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
`;

const DibCategoryBtn = styled.button`
  border: none;
  font-size: 20px;
  color: #595959;
  background-color: transparent;
  height: 27px;
  margin-left: 12px;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: bold;
  }
  &.selected {
    color: black;
    font-weight: bold;
  }
  @media screen and (max-width: 767px) {
    height: 18px;
    font-size: 13px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 30px;
    margin-left: 10px;
    font-size: 20px;
  }
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  margin-left: 230px;
  margin-top: -2px;
  @media screen and (max-width: 767px) {
    margin-left: 60%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 65%;
  }
`;

const StPagenationDiv = styled.div`
  margin: 58px auto;
  height: 30px;
  width: 200px;
  background-color: skyblue;
  display: flex;
  align-items: center;
`;

// ----------------User--------------------

const StForm = styled.form`
  display: flex;
`;

const StUserBox = styled.div`
  width: 900px;
  height: 200px;
  border: none;
  margin: auto;
  font-size: 22px;
  border-radius: 5px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #ffffff;
  box-shadow: 1px 1px 15px 0px #d9d9d9;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 100px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 150px;
  }
`;

const StInfoTextDiv = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 0 5px 5px 5px;
  padding: 5px 0;
  /* font-size: ${(props) => props.fontSize}; */
  @media screen and (max-width: 767px) {
    font-size: 10px;
    margin: 0 5px 0 0;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  @media screen and (max-width: 767px) {
    width: 150px;
  }
`;

const StInfoContainer = styled.div`
  flex-direction: column;
  margin: 35px 0px 10px 300px;
  @media screen and (max-width: 767px) {
    margin: 15px 0px -8px 140px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 30px 0px 0px 200px;
  }
`;

const StImg = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 100%;
  z-index: 99;
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 200px;
  }
`;

const StImgDiv = styled.div`
  position: absolute;
  z-index: 90;
  width: 280px;
  height: 280px;
  overflow: hidden;
  border-radius: 100%;
  top: -10%;
  box-shadow: 3px 3px 3px 0px #d9d9d9;
  background-repeat: no-repeat;
  background-size: 130%;
  background-position: center;
  background-image: url(${profileOrigin});
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
    top: -10%;
    left: -10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 200px;
    top: -10%;
  }
`;

const StUserInfoDiv = styled.div`
  margin: 118px auto 0 auto;
  width: 996px;
  height: 225px;
  display: flex;
  border: none;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin-left: 20px;
    height: 50px;
    margin: 50px auto 0px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 700px;
    margin-left: 50px;
    height: 100px;
    margin: 80px auto 30px auto;
  }
`;

const StCancelBtn = styled.button`
  border-radius: 5px;
  border: 1px solid #6d6d6d;
  background-color: white;
  font-size: 18px;
  width: 64px;
  height: 30px;
  margin-left: 5px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #6d6d6d;
  }
  @media screen and (max-width: 767px) {
    font-size: 8px;
    height: 20px;
    width: 40px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    height: 30px;
    width: 60px;
  }
`;

const StNickInput = styled.input`
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background-color: white;
  font-size: 20px;
  width: 230px;
  text-indent: 5px;
  margin-right: 5px;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    width: 55px;
    height: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    width: 100px;
    height: 30px;
  }
`;

const StUploadBtn = styled.button`
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  position: absolute;
  z-index: 999;
  top: 5%;
  left: 40px;
  margin-top: 180px;
  margin-left: 150px;
  background-color: #ffffff;
  box-shadow: 3px 3px 3px 0px #d9d9d9;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
    font-size: 10px;
    top: -180%;
    left: -80px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    top: -50%;
    left: -10px;
  }
`;

export {
  StPagenationDiv,
  StDibBtn,
  DibCategoryBtn,
  StTitle,
  StContentBox,
  StTabBtnContainer,
  StMypageLayout,
  StTabBtn,
  StForm,
  StUserBox,
  StInfoTextDiv,
  StInfo,
  StInfoContainer,
  StImg,
  StImgDiv,
  StUserInfoDiv,
  StCancelBtn,
  StNickInput,
  StUploadBtn,
};
