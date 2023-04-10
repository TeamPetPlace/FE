import styled from "styled-components";
import List_History from "../../style/img/List_History.svg";

export const StBannerTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  width: 300px;
  /* z-index: 99; */
  margin: 0 auto;
  display: inline-block;
  /* margin: 200px 0 20px 350px; */
  @media screen and (max-width: 767px) {
    margin: 11% 0 0 8%;
    font-size: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 13% 0 0 10%;
    font-size: 25px;
  }
`;

export const StBannerContent = styled.div`
  font-size: 22px;
  color: #555555;
  font-weight: bold;
  padding-top: 10px;
  width: 800px;
  margin: 0 auto;
  display: inline-block;
  margin: 0 auto 0 350px;
  @media screen and (max-width: 767px) {
    /* margin: 0 0 0 8%; */
    font-size: 10px;
    padding-top: 3px;
    width: 150px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* margin: 0 0 0 10%; */
    width: 260px;
    font-size: 15px;
  }
`;

const StPlace = styled.div`
  width: 80%;
  min-width: 300px;
  max-width: 1240px;
  height: 50px;
  margin: 68px auto 5px auto;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-between;
  /* background-color: blue; */
  gap: 10px;
  @media screen and (max-width: 767px) {
    /* width: 300px; */
    height: 20px;
    margin: 40px auto 5px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* width: 650px; */
    height: 20px;
    margin: 50px auto 5px auto;
  }
`;

const StSearchInput = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  text-indent: 10px;
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 30px;
    font-size: 10px;
    text-indent: 0px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 40px;
  }
`;

const StSearchButton = styled.button`
  zoom: 1.4;
  border: none;
  background-color: transparent;
`;

const StSearchDiv = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  /* background-color: #000000; */
  border: 1px solid #555555;
  @media screen and (max-width: 767px) {
    width: 110px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 250px;
  }
`;

const StSelect = styled.select`
  width: 120px;
  height: 45px;
  color: #000000;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #555555;
  border-radius: 0px;
  padding: 5px;
  outline: none;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    transition: all ease 2s 0s;
  }
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 35px;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100px;
    height: 40px;
  }
`;

const StOption = styled.option`
  width: 120px;
  height: 40px;
  background-color: transparent;
  appearance: none;
  border-color: #d9d9d9;
  padding: 5px;
  outline: none;
  font-size: 14px;
  &:hover {
    background-color: white;
  }
`;

const StSearchSortingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const StListPage = styled.div`
  width: 1240px;
  min-width: 300px;
  max-width: 1240px;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: auto;
  /* background-color: pink; */
  /* margin-left: 15%; */
  @media screen and (max-width: 469px) {
    width: 250px;
  }
  @media screen and (min-width: 470px) and (max-width: 694px) {
    width: 424px;
  }
  @media screen and (min-width: 695px) and (max-width: 780px) {
    width: 624px;
  }
  @media screen and (min-width: 780px) and (max-width: 1023px) {
    width: 80%;
  }
`;

const StCards = styled.div`
  width: 100%;
  min-height: 800px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: space-evenly;
  gap: 11px;
  /* background-color: #f7f7de; */
  padding: 30px 0px 30px 0px;
  @media screen and (max-width: 513px) {
    /* width: 300px; */
    height: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    /* width: 760px; */
    height: 100%;
  }
`;

const StCard = styled.div`
  width: 406px;
  height: 320px;
  margin-bottom: 43px;
  border-radius: 10px;
  display: block;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 220px;
    margin-bottom: 0px;
    position: relative;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 230px;
    margin-bottom: 0px;
    position: relative;
  }
`;

const StHistory = styled.div`
  width: 250px;
  height: 100%;
  background-image: url(${List_History});
  background-repeat: no-repeat;
  z-index: 100;
  /* position: -webkit-sticky; */
  position: fixed;
  top: 88%;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: auto;
    right: 0%;
    top: 45%;
    background-size: 100px auto;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 768px) and (max-width: 914px) {
    width: auto;
    top: 92%;
    left: 0%;
    background-size: 180px auto;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 915px) and (max-width: 1023px) {
    width: auto;
    right: 2%;
    top: 92%;
    background-size: 180px auto;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 1024px) {
    left: 0%;
  }
`;

const StHistoryImg = styled.img`
  width: 160px;
  height: 120px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  object-fit: cover;
  position: cover;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 50px;
    border-radius: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 140px;
    height: 90px;
  }
`;

const StHistoryCard = styled.div`
  width: 160px;
  height: 170px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 0 5px 45px;
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 60px;
    padding: 0;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 180px;
    height: 130px;
    padding: 0;
  }
`;

const StHistoryTitle = styled.div`
  font-size: 20px;
  width: 160px;
  text-align: center;
  margin: 5px 40px;
  padding-top: 40px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    margin: 0 5px;
    width: 90px;
    padding-top: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    margin: 0 10px;
    width: 160px;
    padding-top: 20px;
  }
`;

const StHistoryDragTitle = styled.div`
  font-size: 20px;
  width: 90px;
  background-color: #ffd53f;
  text-align: center;
  border-radius: 10px;
  margin: 0px auto 15px 70px;
  padding: 0 10px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    margin: 0 30px 10px 20px;
    padding: 0 5px;
    width: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    margin: 0px 15px 15px 48px;
    width: 72px;
    padding: 0 10px;
  }
`;

const StHistoryContent = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 170px;
  height: 30px;
  /* background-color: pink; */
  @media screen and (max-width: 767px) {
    font-size: 10px;
    height: 20px;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    height: 20px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
  /* cursor: pointer; */
  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 20px;
  }
`;

const StCardTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 13px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StContent = styled.div`
  color: #555555;
  font-size: 14px;
`;

const StCardImg = styled.img`
  width: 406px;
  height: 230px;
  justify-content: center;
  flex-direction: column;
  border: 3px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
  position: cover;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 120px;
    margin-bottom: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 130px;
    margin-bottom: 10px;
  }
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  margin-top: -2px;
  @media screen and (max-width: 767px) {
    left: 75%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 70%;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 340px;
  }
`;

const StIconimg = styled.img`
  width: 36px;
  padding: 0 5px;
  @media screen and (max-width: 767px) {
    width: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 20px;
  }
`;

const StStarIcon = styled.div`
  color: #ffd53f;
  margin-left: 10px;
`;

const StIconBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 25px;
  }
`;

const StPageMoveBtn = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 999;
  bottom: 10%;
  right: 5%;
  width: auto;
  height: 50px;
  border-radius: 60px;
  padding: 5px 0;
  align-items: center;
  background-color: #ffd53f;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media screen and (max-width: 767px) {
    bottom: 25%;
    width: 80px;
    height: 40px;
  }
  @media screen and (min-width: 768px) and (max-width: 914px) {
    /* bottom: 5%;
    left: 3%; */
    width: 100px;
    height: 50px;
  }
  @media screen and (min-width: 915px) and (max-width: 1023px) {
    /* bottom: 10%;
    right: 8%; */
    width: 100px;
    height: 50px;
  }
`;

export {
  StIconBtn,
  StPageMoveBtn,
  StHistoryContent,
  StCardTitle,
  StStarIcon,
  StIconimg,
  StDibBtn,
  StHistoryTitle,
  StHistoryCard,
  StHistoryImg,
  StCardImg,
  StPlace,
  StCards,
  StCard,
  StHistory,
  StTitle,
  StContent,
  StListPage,
  StSearchInput,
  StSearchButton,
  StSearchDiv,
  StSearchSortingDiv,
  StSelect,
  StOption,
  StHistoryDragTitle,
};
