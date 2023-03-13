import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Owner from "../components/owner/Post";

function OwnerPage() {
  return (
    <Layout>
      <Header />
      <Owner />
    </Layout>
  );
}

export default OwnerPage;
