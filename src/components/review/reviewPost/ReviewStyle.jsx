import styled from "styled-components";

const StReviewBox = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: white;
`;

const StBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.523);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
`;

const StFormBox = styled.div`
  border-radius: 10px;
  display: flex;
  width: 800px;
  height: 650px;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 767px) {
    width: 320px;
    height: 400px;
    padding: 1rem;
  }
`;

const StForm = styled.form`
  width: 700px;
  height: 600px;
  margin: auto auto;
`;

const StTopBox = styled.div`
  display: flex;
  margin: 40px 0px;
`;

const StTop = styled.div`
  font-size: 40px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const StMid = styled.div`
  font-size: 24px;
  color: #555;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`;

const StInputBox = styled.div`
  height: 180px;
  display: flex;
  margin: auto 0;
  position: relative;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    width: 320px;
    height: 0px;
  }
`;

const StInput = styled.textarea`
  width: 550px;
  height: 130px;
  margin-right: 20px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  outline: none;
  padding: 10px;
  @media screen and (max-width: 767px) {
    /* width: 300px; */
    height: 80px;
  }
`;

const StImgBtn = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  background-color: #d9d9d9;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const StImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  position: absolute;
  top: 0%;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const StStar = styled.div`
  font-size: 70px;
  margin-top: -80px;
  margin-bottom: -40px;
  color: #ffd53f;
  cursor: pointer;
  display: flex;
  @media screen and (max-width: 767px) {
    font-size: 30px;
    margin-top: -30px;
    margin-bottom: -10px;
  }
`;

const StBtns = styled.div`
  margin: 25px auto;
  width: 420px;
  @media screen and (max-width: 767px) {
    width: 220px;
    margin: 0 auto;
    margin-top: 50px;
    padding-top: 80px;
  }
`;

const StBtn = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid #d9d9d9;
  background-color: transparent;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    font-size: 12px;
    height: 30px;
  }
`;

const StPhotoBtn = styled.button`
  margin-right: 30px;
  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;

export {
  StReviewBox,
  StBackGround,
  StFormBox,
  StForm,
  StTopBox,
  StTop,
  StMid,
  StInputBox,
  StInput,
  StImgBtn,
  StImg,
  StStar,
  StBtns,
  StBtn,
  StPhotoBtn,
};
