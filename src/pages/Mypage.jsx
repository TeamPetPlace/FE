import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useCookies } from "react-cookie";
import BossMypage from "../components/mypage/Mypage/BossMypage";
import UserMypage from "../components/mypage/Mypage/UserMypage";

function Mypage() {
  const [cookies] = useCookies(["AccessToken", "loginType"]);

  return (
    <Layout>
      <Header />
      {cookies.loginType === "USER" && <UserMypage />}
      {cookies.loginType === "BUSINESS" && <BossMypage />}
      <Footer />
    </Layout>
  );
}

export default Mypage;
