import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AllDetailForm from "../components/category/detail/AllDetailForm";
import ChatRoom from "./ChatRoom";
import { useNavigate, useParams } from "react-router-dom";

const HospitalDetail = () => {
  const { id } = useParams();
  const [chatmode, SetChatMode] = useState(false);

  const onEnterHandler = () => {
    SetChatMode(true);
  };

  const onExitHandler = () => {
    SetChatMode(false);
  };

  return (
    <Layout>
      <Header />
      {/* <button onClick={onEnterHandler}> 채팅</button>
      <button onClick={onExitHandler}> 닫기</button>
      {chatmode ? <ChatRoom id={id} /> : null} */}
      <AllDetailForm />
      <Footer />
    </Layout>
  );
};

export default HospitalDetail;
