import styled, { css } from "styled-components";
import ownerPost from "../../style/img/ownerPost.svg";

const StBox = styled.div`
  width: 100%;
  height: 1850px;
  background-image: url(${ownerPost});
  margin: 0 auto;
`;

const StPost = styled.div`
  text-align: center;
  padding: 20px 0px;
  padding-top: 80px;
  font-weight: 900;
  font-size: 30px;
`;

const StTitle = styled.div`
  font-weight: 900;
  font-size: 26px;
  width: 180px;
  display: flex;
`;

const StContents = styled.div`
  height: 230px;
  display: flex;
  line-height: 230px;
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
`;

const StRadioLabel = styled.label`
  font-size: 18px;
`;

const StLine = styled.div`
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
`;

const StErrorMsg = styled.div`
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  color: red;
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
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
  width: 955px;
`;

const StLabels = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

const StRadio = styled.input.attrs({ type: "radio" })`
  margin-right: 15px;
  cursor: pointer;
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
        `;
      case "medium":
        return css`
          width: 200px;
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
`;

const StImgBox = styled.div`
  display: flex;
  height: 40px;
  line-height: 10px;
`;

const StImgUpload = styled.div`
  position: relative;
  border: 1px solid transparent;
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
`;

const StRealBox = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 0%;
  left: 180px;
  overflow: hidden;
  height: 170px;
`;

const StImg = styled.img`
  width: 170px;
  height: 170px;
  margin-right: 10px;
  border-radius: 5px;
`;

const StBtns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StBtn = styled.button`
  cursor: pointer;
  padding: 8px 8px;
  margin-right: 10px;
  border: 1px solid #999;
  text-align: center;
  border-radius: 5px;
  background-color: white;
  &:hover {
    background-color: #999;
    color: white;
  }
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 164px;
          height: 45px;
          font-size: 20px;
          margin-top: 40px;
          &:hover {
            background-color: #ffd53f;
            border: none;
            color: black;
          }
        `;
      case "medium":
        return css`
          width: 164px;
          height: 45px;
          font-size: 20px;
        `;
      case "small":
        return css`
          width: 160px;
          height: 45px;
          font-size: 20px;
        `;
      default:
        return css`
          width: 20px;
        `;
    }
  }}
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
  StErrorMsg,
  StFormBox,
  StForm,
  StLabels,
  StRadio,
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
  StBtns,
  StBtn,
};
