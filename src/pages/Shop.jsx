import React from "react";
import styled from "styled-components";
import ShopList from "../components/category/ShopList";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import banner_shop from "../../src/style/img/banner_shop.png";
import { StBannerTitle, StBannerContent } from "../components/category/AllCategoryListStyle";

export default function Shop() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerTitle>미용</StBannerTitle>
        <StBannerContent>펫플레이스에 오신 것을 환영합니다</StBannerContent>
        <StBannerContent>
          어떤 곳에서, 어떻게 반려동물을 케어할 수 있는지 확인해보세요.
        </StBannerContent>
      </StBanner>
      <ShopList />
      <Footer />
    </Layout>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 634px;
  display: flex;
  flex-direction: column;
  background-image: url(${banner_shop});
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
