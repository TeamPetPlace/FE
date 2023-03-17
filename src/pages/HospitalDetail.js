import React from "react";
import HospitalDetailForm from "../components/category/HospitalDetailForm";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";

function HospitalDetail() {
  return (
    <Layout>
      <Header />
      <HospitalDetailForm />
    </Layout>
  );
}

export default HospitalDetail;
