import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import CafeList from "../components/category/CafeList";
import banner_cafe from "../../src/style/img/banner_cafe.png";
import { StBannerContent, StBannerTitle } from "../components/category/AllCategoryListStyle";

export default function Cafe() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerTitle>카페</StBannerTitle>
        <StBannerContent>펫플레이스에 오신 것을 환영합니다</StBannerContent>
        <StBannerContent>
          반려동물과 함께 방문할 수 있는 카페는 어떤 곳들이 있는지 확인해보세요.
        </StBannerContent>
      </StBanner>
      <CafeList />
      <Footer />
    </Layout>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 634px;
  display: flex;
  flex-direction: column;
  background-image: url(${banner_cafe});
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
