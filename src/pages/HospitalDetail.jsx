import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AllDetailForm from "../components/category/detail/AllDetailForm";

const HospitalDetail = () => {
  return (
    <Layout>
      <Header />
      <AllDetailForm />
      <Footer />
    </Layout>
  );
};

export default HospitalDetail;
