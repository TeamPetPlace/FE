import React from "react";
import styled from "styled-components";
// import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";
// import Layout from "../components/common/Layout";
import HospitalList from "../components/category/HospitalList";

export default function Hospital() {
  return (
    <>
      {/* <Header /> */}
      <StBanner>
        <h1>병원</h1>
        <h2>펫플레이스에 오신걸 환영합니다</h2>
      </StBanner>
      <HospitalList />
      {/* <Footer /> */}
    </>
  );
}

const StBanner = styled.div`
  width: 1920px;
  height: 510px;

  background: #d9d9d9;
`;
