import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import User from "../components/mypage/User";
import PostList from "../components/mypage/PostList";
import ReviewList from "../components/mypage/ReviewList";
import DibsList from "../components/mypage/DibsList";
import Footer from "../components/common/Footer";
import styled from "styled-components";

function Mypage() {
  const [checked, setChecked] = useState([true, false, false, false]);
  const [tab, setTab] = useState("user");

  const mainTabList = [
    { id: 0, text: "유저정보", category: "user" },
    { id: 1, text: "게시글", category: "postList" },
    { id: 2, text: "후기", category: "reviewList" },
    { id: 3, text: "찜목록", category: "dibsList" },
  ];

  const onClickHandler = (i) => {
    const newArr = Array(mainTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("user");
    } else if (i === 1) {
      setTab("postList");
    } else if (i === 2) {
      setTab("reviewList");
    } else {
      setTab("dibsList");
    }
  };

  const [dataList, setDataList] = useState([
    { id: 0, text: "유저정보", category: "user" },
    // { id: 1, text: "게시글", category: "postList" },
    // { id: 2, text: "후기", category: "reviewList" },
    // { id: 3, text: "찜목록", category: "dibsList" },
  ]);

  return (
    <Layout>
      <Header />
      <div>
        {mainTabList?.map((item, i) => (
          <button
            key={i}
            checked={checked[i]}
            onClick={() => onClickHandler(i)}
          >
            {item.text}
          </button>
        ))}
      </div>
      <StTabBox>
        {tab === "user"
          ? dataList.map((item, i) => <User key={i}></User>)
          : tab === "postList"
          ? dataList.map((item, i) => <PostList key={i}></PostList>)
          : tab === "reviewList"
          ? dataList.map((item, i) => <ReviewList key={i}></ReviewList>)
          : tab === "dibsList"
          ? dataList.map((item, i) => <DibsList key={i}></DibsList>)
          : dataList.map((item, i) => <div key={i}></div>)}
      </StTabBox>
      {/* <User />
      <PostList />
      <ReviewList />
      <DibsList /> */}
      {/* <Footer/> */}
    </Layout>
  );
}

export default Mypage;

const StTabBox = styled.div`
  display: flex;
`;
