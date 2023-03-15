import React, { useState } from "react";
import styled from "styled-components";
import User from "./User";
import ReviewList from "./ReviewList";
import DibsList from "./DibsList";

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
          <button
            key={i}
            checked={checked[i]}
            onClick={() => userClickHandler(i)}
          >
            {item.text}
          </button>
        ))}
      </div>
      <StTabBox>
        {tab === "user" ? (
          <User />
        ) : tab === "reviewList" ? (
          <ReviewList />
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
