import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import animal_illust_back from "/Users/eunjin/Desktop/PetPlace/src/style/img/animal_illust_back.svg";

function NotFound() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["AccessToken", "loginType"]);
  return (
    <StWrap>
      <StBox>
        <StTitle>페이지가 존재하지 않습니다</StTitle>
        <StContent>링크를 잘못 입력하셨거나, 페이지가 삭제/이동되었을 수 있습니다.</StContent>
        {cookies.loginType === "USER" || cookies.loginType === "BUSINESS" ? (
          <StMain onClick={() => navigate("/main")}>메인으로 가기</StMain>
        ) : (
          <StMain onClick={() => navigate("/")}>메인으로 가기</StMain>
        )}
      </StBox>
    </StWrap>
  );
}

export default NotFound;

const StWrap = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-color: #fffcec;
  background-image: url(${animal_illust_back});
  @media screen and (max-width: 767px) {
    background-size: 100% 900px;
    background-position: center top 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    background-size: 1000px 900px;
    background-position: center top 60px;
  }
`;

const StBox = styled.div`
  width: 600px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 300px;
  @media screen and (max-width: 767px) {
    width: 400px;
    height: 150px;
    margin-top: 200px;
  }
`;

const StTitle = styled.div`
  font-size: 50px;
  font-weight: 900;
  @media screen and (max-width: 767px) {
    font-size: 25px;
  }
`;

const StContent = styled.div`
  font-size: 20px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
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
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 30px;
    font-size: 10px;
  }
`;
