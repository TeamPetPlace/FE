import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ErrorPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["AccessToken", "loginType"]);
  return (
    <StWrap>
      <StBox>
        <StTitle>로그인이 필요한 사이트입니다.</StTitle>
        <StMain onClick={() => navigate("/")}>로그인/회원가입 하기</StMain>
      </StBox>
    </StWrap>
  );
}

export default ErrorPage;

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
const StContent = styled.div`
  font-size: 20px;
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
