import styled from "styled-components";

const StContainer = styled.div`
  width: 1920px;
  position: relative;
  overflow: hidden;
`;

const StWrap = styled.div`
  display: flex;
  width: 1920px;
  font-size: 50px;
  height: 636px;
`;

const StPostBtn = styled.div`
  position: absolute;
  z-index: 99;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
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
`;

export { StContainer, StWrap, StPostBtn, StClickBtn };
