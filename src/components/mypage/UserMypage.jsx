import React, { useState } from "react";
import styled from "styled-components";
import User from "./User";
import DibsList from "./DibsList";
import MyReviewList from "./MyReviewList";
import { StMypageLayout, StTabBtn, StContentBox, StTabBtnContainer } from "./MypageStyle";

function UserMypage() {
  const [checked, setChecked] = useState([true, false]);
  const [tab, setTab] = useState("reviewList");

  const userTabList = [
    { id: 0, text: "후기", category: "reviewList" },
    { id: 1, text: "찜목록", category: "dibsList" },
  ];

  const userClickHandler = (i) => {
    const newArr = Array(userTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("reviewList");
    } else {
      setTab("dibsList");
    }
  };

  return (
    <StMypageLayout>
      <User />
      <StTabBtnContainer>
        {userTabList?.map((item, i) => (
          <StTabBtn
            key={i}
            checked={checked[i]}
            onClick={() => userClickHandler(i)}
            className={checked[i] ? "selected" : ""}
          >
            {item.text}
          </StTabBtn>
        ))}
      </StTabBtnContainer>
      <StContentBox>
        {tab === "reviewList" ? <MyReviewList /> : tab === "dibsList" ? <DibsList /> : <div></div>}
      </StContentBox>
    </StMypageLayout>
  );
}

export default UserMypage;
