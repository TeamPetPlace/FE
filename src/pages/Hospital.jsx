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
  background-image: url(${hospital_banner});
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

const StTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  width: 300px;
  z-index: 99;
  margin: 200px 0 0 350px;
  @media screen and (max-width: 767px) {
    margin: 13% 0 0 8%;
    font-size: 15px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 13% 0 0 10%;
    font-size: 25px;
  }
`;

const StContent = styled.div`
  font-size: 22px;
  color: #555555;
  font-weight: bold;
  padding-top: 10px;
  width: 300px;
  margin: 0 0 0 350px;
  @media screen and (max-width: 767px) {
    margin: 0 0 0 8%;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 0 0 10%;
    font-size: 15px;
  }
`;
