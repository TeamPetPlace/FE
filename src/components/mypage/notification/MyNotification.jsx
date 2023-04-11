import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAllNotification,
  deleteNotification,
  getNotification,
} from "../../../api/mypage";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Button from "../../../element/Button";
import {
  StWrap,
  StBox,
  StTop,
  StLeft,
  StNoNotification,
  StMsg,
  StTitle,
  StCount,
  StNotificationBox,
  StNotification,
  StMove,
  StRight,
  StDate,
  StDeleteBtn,
} from "./NotificationStyle";
import Swal from "sweetalert2";
import { Fade } from "react-reveal";

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
    Swal.fire({
      position: "center",
      icon: "question",
      title: "알림을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#FFD53F",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotificationMutaion.mutate(notificationId);
      } else {
        return;
      }
    });
  };

  //알림 전체 삭제
  const deleteAllMutation = useMutation(deleteAllNotification, {
    onSuccess: () => queryClient.invalidateQueries("getnotification"),
  });

  const onDeleteAllHandler = () => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "전체 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#FFD53F",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllMutation.mutate();
      } else {
        return;
      }
    });
  };
  return (
    <StWrap>
      <StBox>
        <StTop>
          <StLeft>
            <StTitle>알림</StTitle>
            <StCount>{list.length}</StCount>
          </StLeft>
          <Button onClick={() => onDeleteAllHandler()} size="notification">
            전체삭제
          </Button>
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
                      <Fade bottom>
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
                      </Fade>
                    </StNotification>
                  )}
                  {item.category === "미용" && (
                    <StNotification key={i} style={{ display: "flex" }}>
                      <Fade bottom>
                        <StMove
                          onClick={() => navigate(`/shop/${item.postId}`)}
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
                      </Fade>
                    </StNotification>
                  )}
                  {item.category === "카페" && (
                    <StNotification key={i} style={{ display: "flex" }}>
                      <Fade bottom>
                        <StMove
                          onClick={() => navigate(`/cafe/${item.postId}`)}
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
                      </Fade>
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
