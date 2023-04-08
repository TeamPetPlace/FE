import styled from "styled-components";

const StContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: auto;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const StWrap = styled.div`
  display: flex;
  width: 100%;
  font-size: 50px;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    /* overflow: hidden; */
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
  color: #fff;
  background-color: #764811;
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
  width: 100%;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 120%;
    margin: 0 auto;
    height: auto;
  }
`;

export { StContainer, StWrap, StPostBtn, StClickBtn, StImg };
