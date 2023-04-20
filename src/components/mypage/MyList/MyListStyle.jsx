import styled from "styled-components";
import BasicReviewImg from "../../../../src/style/img/basic_review_img.svg";

const StPageDiv = styled.div`
  width: 978px;
  height: 100px;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
    height: 80px;
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
    height: 80px;
  }
`;

const StImgBtn = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;

const StImgs = styled.img`
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

const StStars = styled.div`
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

const PageBox = styled.div`
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    @media screen and (max-width: 767px) {
      margin-top: 250px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin-top: 190px;
    }
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
    @media screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
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
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      font-size: 15px;
    }
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
    left: 18%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
`;

const StReviews = styled.div`
  display: flex;
  margin: auto;
`;

const StContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;

const StAllReviewList = styled.div`
  width: 918px;
  height: 880px;
  margin: 55px 30px;
  display: flex;
  flex-direction: column;
  /* background-color: yellowgreen; */
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 320px;
    margin: 0 30px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 560px;
    margin: 0px 30px;
  }
`;

const StReviewDiv = styled.div`
  width: 918px;
  height: 190px;
  margin: 0;
  border-bottom: 3px solid #f0f0f0;
  @media screen and (max-width: 767px) {
    width: 240px;
    height: 110px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 150px;
  }
`;

const StReviewImgDiv = styled.div`
  width: 100px;
  height: 100px;
  border: none;
  margin: 30px 20px 10px 5px;
  border-radius: 10px;

  background-color: #d9d9d9;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-image: url(${BasicReviewImg});

  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
    margin: 25px 10px 10px 5px;
    border-radius: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 20px 20px 10px 5px;
  }
`;

const StReviewImg = styled.img`
  width: 100px;
  height: 100px;
  border: none;
  object-fit: cover;
  border-radius: 10px;
  &:hover {
    zoom: 1.1;
  }
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`;
export const StStar = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-top: 35px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 13px;
    margin-top: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-top: 30px;
  }
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-top: 35px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 13px;
    margin-top: 20px;
    height: 20px;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-top: 30px;
  }
`;

export const StTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// --------------MyReviewList--------------

const StReview = styled.div`
  color: #000000;
  font-size: 15px;
  padding: 10px 0;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    padding: 5px 0;
  }
`;

const Stdiv = styled.div`
  width: 825px;
  height: 960px;
  margin: 65px 78px;
  @media screen and (max-width: 767px) {
    width: 280px;
    height: 550px;
    margin: 20px 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 580px;
    height: 800px;
    margin: 50px 40px;
  }
`;

const StListContainer = styled.div`
  width: 820px;
  height: 314px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 280px;
    height: 150px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 500px;
    height: 200px;
  }
`;

const StImg = styled.img`
  width: 320px;
  height: 232px;
  margin-top: 44px;
  border-radius: 5px;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 90px;
    margin-top: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 150px;
    margin-top: 20px;
  }
`;

const StContentContainer = styled.div`
  width: 490px;
  height: 232px;
  margin-top: 44px;
  @media screen and (max-width: 767px) {
    width: 150px;
    height: 100px;
    margin-top: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 150px;
    margin-top: 20px;
  }
`;

const StTitles = styled.div`
  font-size: 20px;
  height: 28px;
  font-weight: bold;
  margin-left: 35px;
  @media screen and (max-width: 767px) {
    font-size: 13px;
    height: 20px;
    margin-left: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 20px;
    height: 30px;
    margin-left: 15px;
  }
`;

const StContent = styled.div`
  font-size: 14px;
  height: 130px;
  margin-left: 35px;

  @media screen and (max-width: 767px) {
    height: 50px;
    margin-left: 10px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 90px;
    margin-left: 15px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StSmallContent = styled.div`
  font-size: 12px;
  width: 100px;
  color: #999999;
  display: flex;
  margin-left: 35px;
  @media screen and (max-width: 767px) {
    margin-left: 5px;
    font-size: 8px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 10px;
  }
`;

const StChatContent = styled.div`
  font-size: 12px;
  color: #999999;
  display: flex;
  margin-left: 440px;
  @media screen and (max-width: 767px) {
    margin-left: 120px;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 320px;
  }
`;

const StUnderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-top: 5px;
  @media screen and (max-width: 767px) {
    width: 150px;
    margin-top: -10px;
  }
`;
const StPhotoBtn = styled.button`
  margin-right: 30px;
  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;

// -------------PostList-------------
const DibCategoryContainer = styled.div`
  width: 300px;
  height: 30px;
  margin: 58px 45px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 20px;
    margin: 10px 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 500px;
    height: 20px;
    margin: 30px 30px;
  }
`;

const StCards = styled.div`
  width: 860px;
  height: 750px;
  margin: 23px 58px 0px 58px;
  display: flex;
  gap: 6px;
  flex-flow: row wrap;
  /* background-color: blue; */
  @media screen and (max-width: 767px) {
    width: 250px;
    height: 250px;
    margin: 10px 28px 0px 28px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 580px;
    height: 500px;
    margin: 15px 40px 0px 40px;
  }
`;

const StCard = styled.div`
  width: 282px;
  height: 250px;
  border-radius: 10px;
  box-align: left;
  /* background-color: pink; */
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
    position: relative;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 280px;
    height: 200px;
    position: relative;
  }
`;

const StContents = styled.div`
  color: #555555;
  width: 100%;
  font-size: 12px;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }
`;

const StCardImg = styled.img`
  width: 278px;
  height: 175px;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #ffd53f;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
  position: cover;
  @media screen and (max-width: 767px) {
    width: 110px;
    height: 70px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 240px;
    height: 140px;
  }
`;

const StStarIcon = styled.div`
  color: #ffd53f;
  margin-left: 10px;
`;

const PageBoxs = styled.div`
  margin-top: 90px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    @media screen and (max-width: 767px) {
      margin-top: 250px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin-top: 200px;
    }
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
    @media screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
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
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      font-size: 15px;
    }
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
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 30%;
  }
`;

const StPageDivs = styled.div`
  width: 978px;
  height: 100px;
  position: relative;
  /* background-color: blue; */
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 660px;
    height: 80px;
  }
`;

const StDibimg = styled.img`
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const StTitleList = styled.div`
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

export {
  StPageDiv,
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
  StImgs,
  StStars,
  StPhotoBtn,
  StBtns,
  PageBox,
  StReviews,
  StContainer,
  StAllReviewList,
  StReviewDiv,
  StReviewImgDiv,
  StReviewImg,
  StTitle,
  StReview,
  Stdiv,
  StListContainer,
  StImg,
  StContentContainer,
  StTitles,
  StContent,
  StSmallContent,
  StChatContent,
  StUnderDiv,
  DibCategoryContainer,
  StCards,
  StCard,
  StContents,
  StCardImg,
  StStarIcon,
  PageBoxs,
  StPageDivs,
  StDibimg,
  StTitleList,
};
