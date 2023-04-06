import React from "react";
import styled from "styled-components";
import ShopList from "../components/category/ShopList";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import banner_shop from "../../src/style/img/banner_shop.png";

export default function Shop() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerImg src={banner_shop}></StBannerImg>
      </StBanner>
      <ShopList />
      <Footer />
    </Layout>
  );
}

const StBannerImg = styled.img`
  width: 100%;
  height: auto;
`;

const StBanner = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  text-align: left;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
`;
