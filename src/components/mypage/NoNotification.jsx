import React from "react";
import styled from "styled-components";

function NoNotification() {
  return (
    <StWrap>
      <StBox></StBox>
    </StWrap>
  );
}

export default NoNotification;

const StWrap = styled.div`
  width: 1920px;
  min-height: 2116px;
  height: 100%;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
`;

const StBox = styled.div`
  width: 980px;
  height: 930px;
  border: 1px solid #d9d9d9;

  background-color: #fff;
  margin: 0 auto;
  margin-top: 120px;
`;
