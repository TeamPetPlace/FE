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
          <StTabBtn
            key={i}
            checked={checked[i]}
            onClick={() => bossClickHandler(i)}
            className={checked[i] ? "selected" : ""}
          >
            {item.text}
          </StTabBtn>
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

const StTabBtn = styled.div`
  width: 150px;
  height: 45px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 60px;
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
    border: 1px solid #d9d9d9;
  }
  &.selected {
    background-color: #ffd53f;
  }
`;
