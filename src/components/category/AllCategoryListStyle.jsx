import styled from "styled-components";
import List_History from "../../style/img/List_History.svg";

const StPlace = styled.div`
  width: 1240px;
  height: 50px;
  margin: 68px auto 5px auto;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 20px;
    margin: 40px auto 5px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 650px;
    height: 20px;
    margin: 50px auto 5px auto;
  }
`;

const StSearchInput = styled.input`
  width: 365px;
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
  border: 1px solid #d9d9d9;
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
  border: 1px solid #d9d9d9;
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
  width: 85%;
  height: 100%;
  display: flex;
  gap: 5px;
  margin-left: 340px;
  @media screen and (max-width: 767px) {
    margin-left: 7.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 7.5%;
  }
`;

const StCards = styled.div`
  width: 1240px;
  height: 100%;
  display: flex;
  gap: 11px;
  flex-flow: row wrap;
  align-items: space-evenly;
  /* background-color: #f7f7de; */
  padding: 30px 0px 30px 0px;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 760px;
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
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 230px;
    margin-bottom: 0px;
  }
`;

const StHistory = styled.div`
  width: 250px;
  max-height: 780px;
  background-image: url(${List_History});
  margin-left: 50px;
  z-index: 999;
  /* position: -webkit-sticky;
  position: sticky; */
  left: 82%;
  top: 30%;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: auto;
    height: auto;
    background-size: 100px auto;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: auto;
    height: auto;
    background-size: 180px auto;
    background-repeat: no-repeat;
  }
`;

const StHistoryImg = styled.img`
  width: 160px;
  height: 140px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  object-fit: cover;
  position: cover;
  @media screen and (max-width: 767px) {
    width: 60px;
    height: 40px;
    border-radius: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 140px;
    height: 100px;
  }
`;

const StHistoryCard = styled.div`
  width: 160px;
  height: 170px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 0 45px;
  @media screen and (max-width: 767px) {
    width: 80px;
    height: 70px;
    padding: 5px 0 0 0;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 180px;
    height: 150px;
    padding: 10px 0 0 0;
  }
`;

const StHistoryTitle = styled.div`
  font-size: 22px;
  padding-left: 60px;
  padding-top: 120px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 10px;
    padding-left: 10px;
    padding-top: 30px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
    padding-left: 45px;
    padding-top: 80px;
  }
`;
const StHistoryContent = styled.div`
  font-size: 20px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
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
  z-index: 999;
  margin-left: 350px;
  margin-top: -2px;
  @media screen and (max-width: 767px) {
    margin-left: 40%;
    margin-top: -2px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 20%;
    margin-top: -2px;
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

export {
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
};
