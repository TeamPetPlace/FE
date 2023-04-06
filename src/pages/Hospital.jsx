import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import HospitalList from "../components/category/HospitalList";
import banner_hospital from "../../src/style/img/banner_hospital.png";
import { StBannerContent, StBannerTitle } from "../components/category/AllCategoryListStyle";

export default function Hospital() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerTitle>병원</StBannerTitle>
        <StBannerContent>펫플레이스에 오신 것을 환영합니다.</StBannerContent>
        <StBannerContent>
          나와 가장 가까이에 있는 동물병원은 어떤 곳이 있는지 확인해보세요.
        </StBannerContent>
      </StBanner>
      <HospitalList />
      <Footer />
    </Layout>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 634px;
  display: flex;
  flex-direction: column;
  background-image: url(${banner_hospital});
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
