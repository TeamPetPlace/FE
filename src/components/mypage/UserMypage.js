import React, { useState } from "react";
import styled from "styled-components";
import User from "./User";
import DibsList from "./DibsList";
import MyReviewList from "./MyReviewList";

function UserMypage() {
  const [checked, setChecked] = useState([true, false, false]);
  const [tab, setTab] = useState("user");

  const userTabList = [
    { id: 0, text: "유저정보", category: "user" },
    { id: 1, text: "후기", category: "reviewList" },
    { id: 2, text: "찜목록", category: "dibsList" },
  ];

  const userClickHandler = (i) => {
    const newArr = Array(userTabList.length).fill(false);
    newArr[i] = true;
    setChecked(newArr);
    if (i === 0) {
      setTab("user");
    } else if (i === 1) {
      setTab("reviewList");
    } else {
      setTab("dibsList");
    }
  };

  return (
    <>
      <div>
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
      </div>
      <StTabBox>
        {tab === "user" ? (
          <User />
        ) : tab === "reviewList" ? (
          <MyReviewList />
        ) : tab === "dibsList" ? (
          <DibsList />
        ) : (
          <div></div>
        )}
      </StTabBox>
    </>
  );
}

export default UserMypage;

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
