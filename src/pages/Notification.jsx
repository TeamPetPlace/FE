import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MyNotification from "../components/mypage/MyNotification";

function Notification() {
  return (
    <Layout>
      <Header />
      <MyNotification />
      <Footer />
    </Layout>
  );
}

export default Notification;
