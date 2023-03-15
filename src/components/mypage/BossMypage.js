import React, { useState } from "react";
import styled from "styled-components";
import User from "./User";
import DibsList from "./DibsList";
import PostList from "./PostList";

function BossMypage() {
  const [checked, setChecked] = useState([true, false, false]);
  const [tab, setTab] = useState("user");

  const bossTabList = [
    { id: 0, text: "유저정보", category: "user" },
    { id: 1, text: "게시글", category: "postList" },
    { id: 2, text: "찜목록", category: "dibsList" },
  ];

  const bossClickHandler = (i) => {
    const newArr = Array(bossTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("user");
    } else if (i === 1) {
      setTab("postList");
    } else {
      setTab("dibsList");
    }
  };

  return (
    <>
      <div>
        {bossTabList?.map((item, i) => (
          <button
            key={i}
            checked={checked[i]}
            onClick={() => bossClickHandler(i)}
          >
            {item.text}
          </button>
        ))}
      </div>
      <StTabBox>
        {tab === "user" ? (
          <User />
        ) : tab === "postList" ? (
          <PostList />
        ) : tab === "dibsList" ? (
          <DibsList />
        ) : (
          <div></div>
        )}
      </StTabBox>
    </>
  );
}

export default BossMypage;

const StTabBox = styled.div`
  display: flex;
`;
