import React, { useState } from "react";
import styled from "styled-components";
import User from "./User";
import DibsList from "./DibsList";
import PostList from "./PostList";
import { StMypageLayout, StTabBtn, StContentBox, StTabBtnContainer } from "./MypageStyle";

function BossMypage() {
  const [checked, setChecked] = useState([true, false]);
  const [tab, setTab] = useState("postList");

  const bossTabList = [
    { id: 0, text: "업체정보", category: "postList" },
    { id: 1, text: "찜목록", category: "dibsList" },
  ];

  const bossClickHandler = (i) => {
    const newArr = Array(bossTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("postList");
    } else {
      setTab("dibsList");
    }
  };

  return (
    <StMypageLayout>
      <User />
      <StTabBtnContainer>
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
      </StTabBtnContainer>
      <StContentBox>
        {tab === "postList" ? <PostList /> : tab === "dibsList" ? <DibsList /> : <div></div>}
      </StContentBox>
    </StMypageLayout>
  );
}

export default BossMypage;
