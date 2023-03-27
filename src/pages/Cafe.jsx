import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import CafeList from "../components/category/CafeList";

export default function Cafe() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StTitle>카페</StTitle>
        <StContent>펫플레이스에 오신걸 환영합니다</StContent>
      </StBanner>
      <CafeList />
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
  background: lightgray;
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
