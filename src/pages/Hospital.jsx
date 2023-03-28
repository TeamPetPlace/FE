import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import HospitalList from "../components/category/HospitalList";
import hospital_banner from "../../src/style/img/hospital_banner.svg";

export default function Hospital() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StTitle>병원</StTitle>
        <StContent>펫플레이스에 오신걸 환영합니다</StContent>
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
  justify-content: center;
  padding-left: 340px;
  padding-right: 340px;
  background-image: url(${hospital_banner});
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
