import React, { useState } from "react";
import User from "./User";
import DibsList from "../MyList/DibsList";
import MyReviewList from "../MyList/MyReviewList";
import { StMypageLayout, StContentBox, StTabBtnContainer } from "./MypageStyle";
import Button from "../../../element/Button";

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
          <Button
            key={i}
            checked={checked[i]}
            onClick={() => userClickHandler(i)}
            className={checked[i] ? "selected" : ""}
            size="mypageTab"
          >
            {item.text}
          </Button>
        ))}
      </StTabBtnContainer>
      <StContentBox>
        {tab === "reviewList" ? (
          <MyReviewList />
        ) : tab === "dibsList" ? (
          <DibsList />
        ) : (
          <div></div>
        )}
      </StContentBox>
    </StMypageLayout>
  );
}

export default UserMypage;
