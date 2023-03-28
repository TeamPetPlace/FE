import React from "react";
import styled from "styled-components";
import ShopList from "../components/category/ShopList";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import shop_banner from "../../src/style/img/shop_banner.svg";

export default function Shop() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StTitle>미용</StTitle>
        <StContent>펫플레이스에 오신걸 환영합니다</StContent>
      </StBanner>
      <ShopList />
      <Footer />
    </Layout>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 513px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 340px;
  padding-right: 340px;
  background-image: url(${shop_banner});
`;

const StTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const StContent = styled.div`
  font-size: 22px;
  color: #555555;
  font-weight: bold;
  padding-top: 20px;
`;
