import styled from "styled-components";

const StMypageLayout = styled.div`
  width: 1920px;
  height: 2116px;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 375px;
    height: 900px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 768px;
    height: 1400px;
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
    height: 900px;
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
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 280px;
    height: 200px;
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

const StContent = styled.div`
  color: #555555;
  width: 100%;
  font-size: 12px;
  @media screen and (max-width: 767px) {
    font-size: 8px;
  }
`;

const StReview = styled.div`
  color: #000000;
  font-size: 15px;
  padding: 10px 0;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    padding: 5px 0;
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

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  margin-left: 230px;
  margin-top: -2px;
  @media screen and (max-width: 767px) {
    margin-left: 18%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 25%;
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

const PageBox = styled.div`
  position: absolute;
  left: 35%;
  top: 95%;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    @media screen and (max-width: 767px) {
      margin-top: 220px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      margin-top: 170px;
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
    left: 30%;
  }
`;

export {
  StPagenationDiv,
  StDibBtn,
  DibCategoryContainer,
  DibCategoryBtn,
  StStarIcon,
  StCardImg,
  StCards,
  StCard,
  StTitle,
  StContent,
  StContentBox,
  StTabBtnContainer,
  StMypageLayout,
  StTabBtn,
  PageBox,
  StReview,
};
