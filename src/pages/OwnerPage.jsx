import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OwnerPage() {
  const navigate = useNavigate();
  return (
    <StWrap>
      <StBox>
        <StTitle>사업자만 이용 가능한 기능입니다.</StTitle>
        <StMain onClick={() => navigate("/main")}>메인으로 가기</StMain>
      </StBox>
    </StWrap>
  );
}

export default OwnerPage;

const StWrap = styled.div`
  width: 100%;
  height: 1500px;
  background-color: #fffdf5;
  display: flex;
`;

const StBox = styled.div`
  width: 800px;
  margin: 0 auto;
  text-align: center;
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 300px;
`;

const StTitle = styled.div`
  font-size: 50px;
  font-weight: 900;
`;

const StMain = styled.button`
  width: 200px;
  margin: 0 auto;
  height: 50px;
  border: 1px solid #eee;
  background-color: #ffd53f;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 900;
  }
`;
