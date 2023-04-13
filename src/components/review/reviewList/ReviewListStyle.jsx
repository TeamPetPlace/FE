import styled from "styled-components";

const StPostBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 18px;
  color: #555;
  cursor: pointer;
  &:hover {
    color: black;
    text-decoration: underline;
  }
  &.selected {
    color: black;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-left: -8px;
  }
`;

const StContentsBox = styled.div`
  width: 1180px;
  height: 1080px;
  border: 1px solid #d9d9d9;
  padding: 30px;
  @media screen and (max-width: 767px) {
    width: 290px;
    height: 800px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 840px;
    height: 95%;
  }
`;

const StReview = styled.div`
  width: 1140px;
  display: flex;
`;

const StPageBox = styled.div`
  width: 1243px;
  height: 100px;
  position: relative;

  @media screen and (max-width: 767px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    margin: 0 auto;
  }
`;

const PageBox = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -80px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: none;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #5e5e5e;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: black;
  }
  ul.pagination li.active {
    background-color: #fffbe3;
    color: black;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: black;
  }
  @media screen and (max-width: 767px) {
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -80px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 30%;
  }
`;

const StReviewBox = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: white;
  @media screen and (max-width: 767px) {
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.523);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
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
  @media screen and (max-width: 767px) {
    width: 100px;
    font-size: 12px;
    height: 30px;
  }
`;

const StReviewBtn = styled.button`
  width: 120px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: transparent;
  margin-right: 10px;
  font-size: 16px;
  float: right;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
  }
  @media screen and (max-width: 767px) {
    float: left;
    font-size: 12px;
    width: 70px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    font-size: 12px;
    width: 70px;
  }
`;

const StCount = styled.div`
  color: #555;
  font-size: 16px;
`;

const StTopReviewBox = styled.div`
  width: 1150px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    width: 300px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 840px;
  }
`;

const StPhotoBtn = styled.button`
  margin-right: 30px;
  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;

export {
  StPostBtn,
  StContentsBox,
  StReview,
  PageBox,
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
  StReviewBtn,
  StCount,
  StTopReviewBox,
  StPageBox,
  StPhotoBtn,
};
