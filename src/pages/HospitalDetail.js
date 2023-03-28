import React from "react";
import HospitalDetailForm from "../components/category/HospitalDetailForm";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function HospitalDetail() {
  return (
    <Layout>
      <Header />
      <HospitalDetailForm />
      <Footer />
    </Layout>
  );
}

export default HospitalDetail;
