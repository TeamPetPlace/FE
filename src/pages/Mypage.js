import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useCookies } from "react-cookie";
import BossMypage from "../components/mypage/BossMypage";
import UserMypage from "../components/mypage/UserMypage";

function Mypage() {
  const [cookies] = useCookies(["access_token", "loginType"]);

  return (
    <Layout>
      <Header />
      {cookies.loginType === "USER" && <UserMypage />}
      {cookies.loginType === "KAKAO_USER" && <UserMypage />}
      {cookies.loginType === "BUSINESS" && <BossMypage />}
      {/* <Footer/> */}
    </Layout>
  );
}

export default Mypage;
