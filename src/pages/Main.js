import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Tab from "../components/main/Tab/Tab";
import Banner from "../components/main/Banner/Banner";
import SecondBanner from "../components/main/Banner/SecondBanner";

function Main() {
  return (
    <Layout>
      <Header />
      <Banner />
      <Tab />
      <SecondBanner />
      <Footer />
    </Layout>
  );
}

export default Main;
