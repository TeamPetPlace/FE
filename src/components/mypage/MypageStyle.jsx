import styled from "styled-components";

const StMypageLayout = styled.div`
  width: 1920px;
  height: 2116px;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
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
`;

const StTabBtn = styled.button`
  width: 490px;
  height: 54px;
  font-size: 22px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px 10px 0 0;
  text-align: center;
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
`;

const StCards = styled.div`
  width: 860px;
  height: 750px;
  margin: 23px 58px 0px 58px;
  display: flex;
  gap: 6px;
  flex-flow: row wrap;
  /* background-color: yellowgreen; */
`;

const StCard = styled.div`
  width: 282px;
  height: 250px;
  border-radius: 10px;
  box-align: left;
  /* background-color: pink; */
`;

const StTitle = styled.div`
  color: #0d0d0d;
  display: flex;
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  /* margin-bottom: 5px; */
  cursor: pointer;
`;

const StContent = styled.div`
  color: #555555;
  font-size: 12px;
`;

const StCardImg = styled.img`
  width: 278px;
  height: 175px;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #ffd53f;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: cover;
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
`;
const DibCategoryContainer = styled.div`
  width: 300px;
  height: 30px;
  margin: 58px 45px;
  gap: 16px;
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  margin-left: 230px;
  margin-top: -2px;
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
};