import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Tab from "../components/main/Tab";
import styled from "styled-components";
import Banner from "../components/main/Banner";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <div>
        <Banner />
        <button onClick={() => navigate("/ownerpost")}>업체등록</button>
      </div>
      <Tab />
      <StBanner>배너2</StBanner>
      <Footer />
    </Layout>
  );
}

export default Main;

const StBanner = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 20rem;
`;
