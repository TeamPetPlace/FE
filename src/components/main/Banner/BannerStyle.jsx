import styled from "styled-components";

const StContainer = styled.div`
  width: 1920px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const StWrap = styled.div`
  display: flex;
  width: 1920px;
  font-size: 50px;
  height: 636px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    /* overflow: hidden; */
    height: 300px;
  }
`;

const StPostBtn = styled.div`
  position: absolute;
  z-index: 99;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
  }
`;

const StClickBtn = styled.button`
  width: 240px;
  height: 45px;
  text-align: center;
  border-radius: 10px;
  border: none;
  font-size: 22px;
  background-color: #ffd53f;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  padding: 0 20px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 120px;
    height: 35px;
    font-size: 12px;
    line-height: 35px;
  }
`;

const StImg = styled.img`
  @media screen and (max-width: 768px) {
    width: 120%;
    margin: 0 auto;
    height: 300px;
  }
`;

export { StContainer, StWrap, StPostBtn, StClickBtn, StImg };
