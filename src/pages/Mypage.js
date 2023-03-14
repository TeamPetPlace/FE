import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import User from "../components/mypage/User";
import PostList from "../components/mypage/PostList";
import ReviewList from "../components/mypage/ReviewList";
import DibsList from "../components/mypage/DibsList";
import Footer from "../components/common/Footer";

function Mypage() {
  return (
    <Layout>
      <Header />
      <User />
      <PostList />
      <ReviewList />
      <DibsList />
      {/* <Footer/> */}
    </Layout>
  );
}

export default Mypage;
