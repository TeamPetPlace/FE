import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAllNotification,
  deleteNotification,
  getNotification,
} from "../../api/mypage";
import Layout from "../common/Layout";
import Header from "../common/Header";
import Footer from "../common/Footer";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function MyNotification() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  //알림 목록 불러오기
  const { data } = useQuery("getnotification", getNotification, {
    onSuccess: (response) => {
      if (response) {
        setList(response);
      }
    },
  });

  //알림 개별 삭제
  const queryClient = useQueryClient();
  const deleteNotificationMutaion = useMutation(deleteNotification, {
    onSuccess: () => queryClient.invalidateQueries("getnotification"),
  });

  const onDeleteNotificationHandler = (notificationId) => {
    const message = window.confirm("알림을 삭제하시겠습니까?");
    if (message) {
      deleteNotificationMutaion.mutate(notificationId);
    } else {
      return;
    }
  };

  //알림 전체 삭제
  const deleteAllMutation = useMutation(deleteAllNotification, {
    onSuccess: () => queryClient.invalidateQueries("getnotification"),
  });

  const onDeleteAllHandler = () => {
    const message = window.confirm("전체 삭제하시겠습니까?");
    if (message) {
      deleteAllMutation.mutate();
    } else {
      return;
    }
  };
  return (
    <StWrap>
      <StBox>
        <StTop>
          <StLeft>
            <StTitle>알림</StTitle>
            <StCount>{list.length}</StCount>
          </StLeft>
          <StAllDeleteBtn onClick={() => onDeleteAllHandler()}>
            전체삭제
          </StAllDeleteBtn>
        </StTop>
        {list.length == 0 && (
          <StNoNotification>
            <StMsg>알림이 없습니다</StMsg>
          </StNoNotification>
        )}
        <StNotificationBox>
          {list !== [] &&
            list.map((item, i) => {
              return (
                <div key={i}>
                  {item.category === "병원" && (
                    <StNotification key={i} style={{ display: "flex" }}>
                      <StMove
                        onClick={() => navigate(`/hospital/${item.postId}`)}
                      >
                        <span style={{ fontWeight: "900" }}>
                          {item.nickname}님!
                        </span>{" "}
                        {item.content}
                      </StMove>
                      <StRight>
                        <StDate>
                          {item.createdAt.split("T", 1)}{" "}
                          {item.createdAt.slice(11, 16)}
                        </StDate>

                        <StDeleteBtn
                          onClick={() => onDeleteNotificationHandler(item.id)}
                        >
                          <GrClose />
                        </StDeleteBtn>
                      </StRight>
                    </StNotification>
                  )}
                  {item.category === "미용" && (
                    <StNotification key={i} style={{ display: "flex" }}>
                      <StMove onClick={() => navigate(`/shop/${item.postId}`)}>
                        <span style={{ fontWeight: "900" }}>
                          {item.nickname}님!
                        </span>{" "}
                        {item.content}
                      </StMove>
                      <StRight>
                        <StDate>
                          {item.createdAt.split("T", 1)}{" "}
                          {item.createdAt.slice(11, 16)}
                        </StDate>

                        <StDeleteBtn
                          onClick={() => onDeleteNotificationHandler(item.id)}
                        >
                          <GrClose />
                        </StDeleteBtn>
                      </StRight>
                    </StNotification>
                  )}
                  {item.category === "카페" && (
                    <StNotification key={i} style={{ display: "flex" }}>
                      <StMove onClick={() => navigate(`/cafe/${item.postId}`)}>
                        <span style={{ fontWeight: "900" }}>
                          {item.nickname}님!
                        </span>{" "}
                        {item.content}
                      </StMove>
                      <StRight>
                        <StDate>
                          {item.createdAt.split("T", 1)}{" "}
                          {item.createdAt.slice(11, 16)}
                        </StDate>

                        <StDeleteBtn
                          onClick={() => onDeleteNotificationHandler(item.id)}
                        >
                          <GrClose />
                        </StDeleteBtn>
                      </StRight>
                    </StNotification>
                  )}
                </div>
              );
            })}
        </StNotificationBox>
      </StBox>
    </StWrap>
  );
}

export default MyNotification;

const StWrap = styled.div`
  width: 100%;
  min-height: 2116px;
  height: 100%;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
`;

const StBox = styled.div`
  width: 100%;
  margin-top: 120px;
`;

const StTop = styled.div`
  display: flex;
  width: 980px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    width: 340px;
    margin: 0 auto;
  }
`;

const StLeft = styled.div`
  display: flex;
`;

const StNoNotification = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  width: 980px;
  height: 930px;
  margin: 0 auto;
`;

const StMsg = styled.div`
  font-size: 20px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  line-height: 930px;
`;

const StTitle = styled.div`
  font-size: 32px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const StCount = styled.div`
  width: 40px;
  height: 30px;
  border-radius: 15px;
  background-color: #ee4a16;
  text-align: center;
  color: #fff;
  margin: auto 0;
  margin-left: 10px;
  line-height: 30px;
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 20px;
    line-height: 20px;
  }
`;

const StAllDeleteBtn = styled.button`
  width: 90px;
  height: 28px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  margin: auto 0;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 20px;
    font-size: 12px;
  }
`;

const StNotificationBox = styled.div`
  width: 980px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 350px;
    margin: 0 auto;
  }
`;

const StNotification = styled.div`
  width: 930px;
  background-color: #fff;
  height: 25px;
  margin-bottom: 24px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 320px;
    margin: 0 auto;
    height: 20px;
    margin-bottom: 12px;
    padding: 12px;
  }
`;

const StMove = styled.div`
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    width: 290px;
  }
`;

const StRight = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    line-height: 10px;
    gap: 0px;
  }
`;

const StDate = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 10px;
    text-align: center;
  }
`;

const StDeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
