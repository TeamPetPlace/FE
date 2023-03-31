import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import HospitalList from "../components/category/HospitalList";
import hospital_banner from "../../src/style/img/hospital_banner.svg";
import { StBannerContent, StBannerTitle } from "../components/category/AllCategoryListStyle";

export default function Hospital() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerTitle>병원</StBannerTitle>
        <StBannerContent>펫플레이스에 오신걸 환영합니다</StBannerContent>
      </StBanner>
      <HospitalList />
      <Footer />
    </Layout>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 513px;
  display: flex;
  flex-direction: column;
  background-image: url(${hospital_banner});
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 150px;
    background-size: auto 150px;
    background-repeat: no-repeat;
    background-position: top right 50%;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 300px;
    background-size: auto 300px;
    background-repeat: no-repeat;
    background-position: top right 40%;
  }
`;
