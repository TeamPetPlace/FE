import React, { useState } from "react";
import User from "./User";
import DibsList from "../MyList/DibsList";
import PostList from "../MyList/PostList";
import { StMypageLayout, StContentBox, StTabBtnContainer } from "./MypageStyle";
import { useNavigate } from "react-router-dom";
import Button from "../../../element/Button";

function BossMypage() {
  const [checked, setChecked] = useState([true, false]);
  const [tab, setTab] = useState("postList");

  const navigate = useNavigate();

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
          <Button
            key={i}
            checked={checked[i]}
            onClick={() => bossClickHandler(i)}
            className={checked[i] ? "selected" : ""}
            size="mypageTab"
          >
            {item.text}
          </Button>
        ))}
      </StTabBtnContainer>
      <StContentBox>
        {tab === "postList" ? (
          <PostList />
        ) : tab === "dibsList" ? (
          <DibsList />
        ) : (
          <div></div>
        )}
      </StContentBox>
    </StMypageLayout>
  );
}

export default BossMypage;
