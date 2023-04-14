import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Post from "../components/owner/Post";
import { useCookies } from "react-cookie";
import OwnerPage from "./OwnerPage";

function OwnerPost() {
  const [cookies] = useCookies(["AccessToken", "loginType"]);
  return (
    <Layout>
      <Header />
      {cookies.loginType === "BUSINESS" ? <Post /> : <OwnerPage />}

      <Footer />
    </Layout>
  );
}

export default OwnerPost;
