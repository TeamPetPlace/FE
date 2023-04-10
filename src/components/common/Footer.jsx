import React from "react";
import Layout from "./Layout";
import { StTop, StFooter, StWraps, StUl, StLi } from "./CommonStyle";

function Footer() {
  return (
    <Layout>
      <StFooter>
        <StWraps>
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
        </StWraps>
        <StTop>(C) 2023. Design by Pet place</StTop>
      </StFooter>
    </Layout>
  );
}

export default Footer;
