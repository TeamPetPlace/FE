import styled, { css } from "styled-components";
import ownerPost from "../../../style/img/ownerPost.svg";

const StBox = styled.div`
  width: 100%;
  height: 1850px;
  background-image: url(${ownerPost});
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StPost = styled.div`
  text-align: center;
  padding: 20px 0px;
  padding-top: 80px;
  font-weight: 900;
  font-size: 30px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 26px;
  width: 180px;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100px;
    font-size: 12px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
    width: 100px;
  }
`;

const StContents = styled.div`
  height: 230px;
  display: flex;
  line-height: 230px;
  @media screen and (max-width: 767px) {
    height: 110px;
    line-height: 110px;
    margin-bottom: 10px;
    margin-left: -5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 160px;
    line-height: 160px;
  }
`;

const StImp = styled.div`
  color: red;
  font-size: 15px;
  line-height: 20px;
`;

const StImps = styled.div`
  color: red;
  font-size: 15px;
  line-height: 210px;
  @media screen and (max-width: 767px) {
    line-height: 100px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    line-height: 150px;
  }
`;

const StRadioLabel = styled.label`
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const StLine = styled.div`
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    line-height: 30px;
    margin-bottom: 12px;
  }
`;
const StLines = styled.div`
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
`;

const StPostBox = styled.div`
  @media screen and (max-width: 768px) {
    margin-left: 20px;
  }
`;

const StErrorMsg = styled.div`
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  color: red;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    width: 100px;
    margin-top: -20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StFormBox = styled.div`
  width: 1240px;
  height: 1440px;
  background-color: #fff;
  box-shadow: 1px 1px 10px 0px #ffeba2;
  border-radius: 5px;
  margin: 0px auto;
  padding: 0px 20px;
  padding-top: 80px;
  padding-bottom: 60px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 1100px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 670px;
    height: 1200px;
  }
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
  width: 955px;
  @media screen and (max-width: 767px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 650px;
    margin: 0 auto;
  }
`;

const StLabels = styled.div`
  margin-left: 10px;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-left: -0px;
  }
`;

const StRadio = styled.input.attrs({ type: "radio" })`
  margin-right: 15px;
  cursor: pointer;
`;

const StTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StColumn = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: -20px;
  }
`;

const StHoliday = styled.select`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding: 5px 5px;
  width: 80px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
`;

const StWeek = styled.option`
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const StInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  margin-right: 20px;
  padding: 10px 15px;
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 400px;
          @media screen and (max-width: 768px) {
            width: 200px;
          }
        `;
      case "medium":
        return css`
          width: 200px;
          @media screen and (max-width: 768px) {
            width: 200px;
          }
        `;
      case "small":
        return css`
          width: 120px;
          height: 27px;
        `;
      default:
        return css`
          width: 540px;
          height: 27px;
          @media screen and (max-width: 767px) {
            width: 160px;
            height: 15px;
          }

          @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 300px;
            height: 20px;
          }
        `;
    }
  }}
`;

const StText = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding: 10px 15px;
  width: 750px;
  height: 200px;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    width: 160px;
    height: 100px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 120px;
  }
`;

const StImgBox = styled.div`
  display: flex;
  height: 40px;
  line-height: 10px;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

const StImgUpload = styled.div`
  position: relative;
  border: 1px solid transparent;
`;

const StMent = styled.p`
  @media screen and (max-width: 767px) {
    font-size: 10px;
    width: 90px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StFakeBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

const StFake = styled.div`
  width: 170px;
  height: 170px;
  margin-right: 10px;
  background-color: lightgray;
  border-radius: 5px;
  @media screen and (max-width: 767px) {
    display: none;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 130px;
    height: 130px;
  }
`;

const StRealBox = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 0%;
  left: 180px;
  overflow: hidden;
  height: 170px;
  @media screen and (max-width: 767px) {
    left: 40px;
    height: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 95px;
  }
`;

const StImg = styled.img`
  width: 170px;
  height: 170px;
  margin-right: 10px;
  border-radius: 5px;
  @media screen and (max-width: 767px) {
    height: 50px;
    width: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 130px;
    height: 130px;
  }
`;

const StBtns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media screen and (max-width: 767px) {
    margin-top: 50px;
  }
`;

const Stdiv = styled.div`
  width: 100%;
`;

const StWrap = styled.div`
  width: 100%;
  margin: 60px auto;
  margin-bottom: 100px;
`;

const StBtnBoxs = styled.div`
  display: flex;

  width: 1240px;
  justify-content: flex-end;
  margin: 0 auto;
  margin-bottom: 30px;
  @media screen and (max-width: 767px) {
    width: 350px;
    margin: 0 auto;
    margin-bottom: 50px;
    margin-top: -20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 700px;
    margin: 0 auto;
    margin-bottom: 30px;
    margin: 0 auto;
  }
`;

export {
  StBox,
  StPost,
  StTitle,
  StContents,
  StImp,
  StImps,
  StRadioLabel,
  StLine,
  StLines,
  StPostBox,
  StErrorMsg,
  StFormBox,
  StForm,
  StLabels,
  StRadio,
  StTimeBox,
  StColumn,
  StHoliday,
  StWeek,
  StInput,
  StText,
  StImgBox,
  StImgUpload,
  StFakeBox,
  StFake,
  StRealBox,
  StImg,
  StMent,
  StBtns,
  Stdiv,
  StWrap,
  StBtnBoxs,
};
