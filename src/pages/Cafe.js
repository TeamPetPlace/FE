import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import CafeList from "../components/category/CafeList";

function Cafe() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <h1>카페</h1>
        <h2>펫플레이스에 오신걸 환영합니다</h2>
      </StBanner>
      <CafeList />
      <Footer />
    </Layout>
  );
}

export default Cafe;

const StBanner = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: lightgray;
`;
