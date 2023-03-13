import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Post from "../components/owner/Post";

function OwnerPost() {
  return (
    <Layout>
      <Header />
      <Post />
      <Footer />
    </Layout>
  );
}

export default OwnerPost;
