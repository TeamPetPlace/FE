import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import AllDetailForm from "../components/category/detail/AllDetailForm";
import Footer from "../components/common/Footer";

function ShopDetail() {
  return (
    <Layout>
      <Header />
      <AllDetailForm />
      <Footer />
    </Layout>
  );
}

export default ShopDetail;
