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
`;

const StSearchInput = styled.input`
  width: 365px;
  height: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  text-indent: 10px;
`;

const StSearchButton = styled.button`
  zoom: 1.4;
  border: none;
  background-color: transparent;
`;

const StSearchDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #d9d9d9;
`;

const StSelect = styled.select`
  width: 120px;
  height: 45px;
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
  @media screen and (max-width: 768px) {
    padding: 0;
    margin-right: 0px;
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
  /* background-color: white; */
  gap: 11px;
  /* background-color: none; */
`;

const StListPage = styled.div`
  width: 85%;
  height: 100%;
  /* display: flex; */
  display: block;
  gap: 5px;
  margin-left: 340px;
  overflow: hidden;
`;

const StCards = styled.div`
  width: 1240px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  gap: 11px;
  flex-flow: row wrap;
  /* margin: auto; */
  /* flex-direction: column; */
  /*   flex-wrap: wrap; */
  align-items: space-evenly;
  background-color: #f7f7de;
  padding: 30px 0px 30px 0px;
`;

const StCard = styled.div`
  width: 406px;
  height: 320px;
  margin-bottom: 43px;
  /* background-color: #e3def7; */
  border-radius: 10px;
  /* align-items: space-evenly; */
`;

const StHistory = styled.div`
  width: 250px;
  /* min-height: 350px; */
  max-height: 780px;
  background-image: url(${List_History});
  margin-left: 57px;
  right: 5%;
  top: 50%;
  position: absolute;
`;

const StHistoryImg = styled.img`
  width: 160px;
  height: 110px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
`;

const StHistoryCard = styled.div`
  width: 160px;
  height: 170px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-left: 45px;
`;

const StHistoryTitle = styled.div`
  font-size: 24px;
  padding-left: 55px;
  padding-top: 90px;
  font-weight: bold;
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  /* font-size: 36px; */
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  margin-bottom: 5px;
`;

const StContent = styled.div`
  color: #555555;
  font-size: 12px;
`;

const StCardImg = styled.img`
  width: 406px;
  height: 230px;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #ffd53f;
  border-radius: 10px;
  overflow: hidden;
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 6%;
  top: 0%;
`;

const StIconimg = styled.img`
  width: 36px;
  padding: 0 5px;
`;

export {
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
