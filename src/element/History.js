import React, { useState } from "react";
import { getHistory } from "../api/detail";
import {
  StHistory,
  StHistoryDragTitle,
  StHistoryTitle,
  StHistoryCard,
  StHistoryImg,
  StHistoryContent,
} from "../components/category/AllCategoryListStyle";
import Draggable from "react-draggable";
import _ from "lodash";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();

  //봤던 게시글 조회
  const [history, setHistory] = useState([]);

  const response = useQuery("getHistory", getHistory, {
    onSuccess: (response) => {
      setHistory(response);
    },
  });

  //내가 봤던 기록 드래그
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const nodeRef = React.useRef(null);

  return (
    <Draggable onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef}>
      <StHistory ref={nodeRef}>
        <div>
          <StHistoryDragTitle>Drag me!</StHistoryDragTitle>
          <StHistoryTitle>내가 봤던 기록</StHistoryTitle>
          {history.map((item, index) => {
            return (
              <>
                {item.category === "병원" && (
                  <StHistoryCard key={index} onClick={() => navigate(`/hospital/${item.id}`)}>
                    <StHistoryImg src={item.reSizeImage} alt="historyImg" />
                    <StHistoryContent>{item.title}</StHistoryContent>
                  </StHistoryCard>
                )}
                {item.category === "미용" && (
                  <StHistoryCard key={index} onClick={() => navigate(`/shop/${item.id}`)}>
                    <StHistoryImg src={item.reSizeImage} alt="historyImg" />
                    <StHistoryContent>{item.title}</StHistoryContent>
                  </StHistoryCard>
                )}
                {item.category === "카페" && (
                  <StHistoryCard key={index} onClick={() => navigate(`/cafe/${item.id}`)}>
                    <StHistoryImg src={item.reSizeImage} alt="historyImg" />
                    <StHistoryContent>{item.title}</StHistoryContent>
                  </StHistoryCard>
                )}
              </>
            );
          })}
        </div>
      </StHistory>
    </Draggable>
  );
}

export default History;
