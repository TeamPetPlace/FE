import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAllNotification,
  deleteNotification,
  getNotification,
} from "../api/mypage";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function Notification() {
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
    <Layout>
      <Header />
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
                          <div>
                            {item.createdAt.split("T", 1)}{" "}
                            {item.createdAt.slice(11, 16)}
                          </div>

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
                        <StMove
                          onClick={() => navigate(`/shop/${item.postId}`)}
                        >
                          <span style={{ fontWeight: "900" }}>
                            {item.nickname}님!
                          </span>{" "}
                          {item.content}
                        </StMove>
                        <StRight>
                          <div>
                            {item.createdAt.split("T", 1)}{" "}
                            {item.createdAt.slice(11, 16)}
                          </div>

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
                        <StMove
                          onClick={() => navigate(`/cafe/${item.postId}`)}
                        >
                          <span style={{ fontWeight: "900" }}>
                            {item.nickname}님!
                          </span>{" "}
                          {item.content}
                        </StMove>
                        <StRight>
                          <div>
                            {item.createdAt.split("T", 1)}{" "}
                            {item.createdAt.slice(11, 16)}
                          </div>

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
      <Footer />
    </Layout>
  );
}

export default Notification;

const StWrap = styled.div`
  width: 1920px;
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
`;

const StLeft = styled.div`
  display: flex;
`;

const StTitle = styled.div`
  font-size: 32px;
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
`;

const StAllDeleteBtn = styled.button`
  width: 90px;
  height: 28px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  margin: auto 0;
`;

const StNotificationBox = styled.div`
  width: 980px;
  margin: 0 auto;
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
`;

const StMove = styled.div`
  cursor: pointer;
`;

const StRight = styled.div`
  display: flex;
  gap: 10px;
`;

const StDeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;
