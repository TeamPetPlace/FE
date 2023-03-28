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
  gap: 11px;
`;

const StListPage = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  gap: 5px;
  margin-left: 340px;
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
`;

const StCard = styled.div`
  width: 406px;
  height: 320px;
  margin-bottom: 43px;
  border-radius: 10px;
  display: block;
`;

const StHistory = styled.div`
  width: 250px;
  max-height: 780px;
  background-image: url(${List_History});
  margin-left: 50px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const StHistoryImg = styled.img`
  width: 160px;
  height: 140px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  position: cover;
`;

const StHistoryCard = styled.div`
  width: 160px;
  height: 170px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-left: 45px;
  padding-top: 30px;
`;

const StHistoryTitle = styled.div`
  font-size: 22px;
  padding-left: 60px;
  padding-top: 120px;
  font-weight: bold;
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  /* font-size: 36px; */
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
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
  overflow: hidden;
  position: cover;
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  margin-left: 350px;
  margin-top: -2px;
`;

const StIconimg = styled.img`
  width: 36px;
  padding: 0 5px;
`;

const StStarIcon = styled.div`
  color: #ffd53f;
  margin-left: 10px;
`;

export {
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
