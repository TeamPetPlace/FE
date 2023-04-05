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

function Notification() {
  const [list, setList] = useState([]);

  //알림 목록 불러오기
  const { data } = useQuery("getnotification", getNotification, {
    onSuccess: (response) => {
      Object.entries(setList(response));
      console.log(list);
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
    const message = window.confirm("전체삭제?");
    if (message) {
      deleteAllMutation.mutate();
    } else {
      return;
    }
  };

  const count = list.length;

  return (
    <Layout>
      <Header count={count} />
      <div>
        Notification
        <button onClick={() => onDeleteAllHandler()}>전체삭제</button>
        <div>알림 : {list.length}개</div>
        {list !== [] &&
          list.map((item, i) => {
            return (
              <div key={i} style={{ display: "flex" }}>
                <div>{item.id}</div>
                <div>{item.content}</div>
                <button onClick={() => onDeleteNotificationHandler(item.id)}>
                  삭제
                </button>
              </div>
            );
          })}
      </div>
      <Footer />
    </Layout>
  );
}

export default Notification;
