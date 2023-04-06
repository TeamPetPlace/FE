import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Layout from "../components/common/Layout";
import HospitalList from "../components/category/HospitalList";
import banner_hospital from "../../src/style/img/banner_hospital.png";

export default function Hospital() {
  return (
    <Layout>
      <Header />
      <StBanner>
        <StBannerImg src={banner_hospital}></StBannerImg>
      </StBanner>
      <HospitalList />
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
