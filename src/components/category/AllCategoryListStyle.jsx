import styled from "styled-components";

const StPlace = styled.div`
  width: 1240px;
  height: 50px;
  margin: auto;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 68px;
`;

const StSearchInput = styled.input`
  width: 365px;
  height: 40px;
  border: none;
  outline: none;
  padding-left: 10px;
  font-size: 14px;
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
  display: flex;
  /* align-items: space-evenly; */
  gap: 5px;
  margin-left: 340px;
  /* background-color: black; */
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
  /* background-color: #f7f7de; */
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
  width: 226px;
  min-height: 350px;
  max-height: 767px;
  background-color: #fffcec;
  margin-left: 57px;
  border-radius: 15px;
  margin-top: 30px;
  /* display: flex; */
  /* position: fixed; */
`;

const StHistoryImg = styled.img`
  width: 160px;
  height: 140px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
`;

const StHistoryCard = styled.div`
  width: 160px;
  height: 170px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-left: 33px;
  padding-right: 33px;
`;

const StHistoryTitle = styled.div`
  font-size: 24px;
  padding: 54px 39px 28px 39px;
  font-weight: bold;
`;

const StTitle = styled.div`
  color: #0d0d0d;
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
`;

export {
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
