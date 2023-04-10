import React from "react";
import styled from "styled-components";
import spin from "../style//img/Spin.gif";

function Loading() {
  return (
    <StBackGround>
      <StSpinner>
        <img src={spin} alt="로딩중" />
      </StSpinner>
    </StBackGround>
  );
}

export default Loading;

const StBackGround = styled.div`
  background-color: #fffdf5;

  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const StSpinner = styled.div`
  width: 20%;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  text-align: center;
  animation: rotate 1.5s infinite;
  transform: rotate(0deg);
`;
