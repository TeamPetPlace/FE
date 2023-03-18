import React from "react";
import styled from "styled-components";
import ShopList from "../components/category/ShopList";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";

function Shop() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <h1>미용</h1>
        <h2>펫플레이스에 오신걸 환영합니다</h2>
      </StBanner>
      <ShopList />
      <Footer />
    </Layout>
  );
}

export default Shop;

const StBanner = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: lightgray;
`;
