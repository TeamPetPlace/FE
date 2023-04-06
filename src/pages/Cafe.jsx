import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import CafeList from "../components/category/CafeList";
import banner_cafe from "../../src/style/img/banner_cafe.png";

export default function Cafe() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerImg src={banner_cafe}></StBannerImg>
      </StBanner>
      <CafeList />
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
