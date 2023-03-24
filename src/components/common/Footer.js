import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

function Footer() {
  return (
    <Layout>
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

const StFooter = styled.div`
  width: 100%;
  height: 8rem;
  background-color: rgb(43, 43, 43);
`;

const StWrap = styled.div`
  display: flex;
  float: right;
  padding-right: 60px;
  margin-top: 5px;
`;

const StUl = styled.ul`
  color: rgb(127, 132, 135);
  font-weight: 900;
  font-size: 10px;
`;

const StLi = styled.li`
  color: rgb(127, 132, 135);
  list-style: none;
  font-weight: 300;
  text-align: center;
  margin-top: 5px;
`;
