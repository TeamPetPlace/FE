import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

function Footer() {
  return (
    <Layout>
      <StTop>(C) 2023. Design by Pet place</StTop>
      <StFooter>
        <StWrap>
          <StUl>
            Project Name
            <StLi>펫 플레이스 (P.P)</StLi>
          </StUl>
          <StUl>
            Frontend
            <StLi>남궁윤서</StLi>
            <StLi>신은진</StLi>
          </StUl>
          <StUl>
            Backend
            <StLi>이건호</StLi>
            <StLi>김우영</StLi>
            <StLi>표창영</StLi>
          </StUl>
          <StUl>
            Designer
            <StLi>김은정</StLi>
          </StUl>
        </StWrap>
      </StFooter>
    </Layout>
  );
}

export default Footer;

const StTop = styled.div`
  width: 300px;
  color: #98886b;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 10px;
  text-align: center;
`;

const StFooter = styled.div`
  width: 100%;
  height: 200px;
  background-color: #0d0d0d;
`;

const StWrap = styled.div`
  width: 450px;
  height: 119px;
  display: flex;
  float: right;
  margin-top: 20px;
  margin-right: 300px;
`;

const StUl = styled.ul`
  color: rgb(127, 132, 135);
  font-weight: 900;
  font-size: 12px;
`;

const StLi = styled.li`
  color: rgb(127, 132, 135);
  list-style: none;
  font-weight: 300;
  text-align: center;
  margin-top: 5px;
`;
