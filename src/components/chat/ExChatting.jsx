import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getChattingList, postChatting } from "../../api/main";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../api/axios";
import { Navigate } from "react-router-dom";

function ExChatting({ roomId, postId }) {
  const [cookies] = useCookies(["AccessToken", "nickname"]);
  const [chatlog, setChatlog] = useState([]);
  const sender = cookies.nickname;
  const [profileImage, setProfileImage] = useState("");
  const [log, setLog] = useState("");
  const [list, setList] = useState([]);

  let client = useRef(null);
  const connect = () => {
    const socket = new SockJS(`https://petplace.site/ws/place`);

    client.current = Stomp.over(socket);
    // client.debug = false;
    client.current.connect({}, () => {
      client.current.subscribe(`/sub/${roomId}`, (response) => {
        let data = JSON.parse(response.body);
        setChatlog((prev) => [...prev, data]);
        client.current.send(JSON.stringify(data));
        console.log(chatlog);
      });
      disconnect();

      const sendSettings = {
        roomId,
        sender: sender,
        profileImage: profileImage,
        message: log,
      };
      client.current.send(`/pub/${postId}`, {}, JSON.stringify(sendSettings));
    });
  };

  const disconnect = async () => {
    try {
      if (client) {
        await client.disconnect();
        await client.unsubscribe(roomId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const chatData = async () => {
      connect();
    };
    chatData();
    return () => {
      disconnect();
    };
  }, []);

  const messagesRef = useRef(null);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();

      let message = log;
      if (message === "") {
        return;
      }
      const sendSettings = {
        roomId,
        sender: sender,
        profileImage: profileImage,
        message: message,
      };
      client.current.send(`/pub/${postId}`, {}, JSON.stringify(sendSettings));
    },
    [log, roomId, sender, profileImage, client, postId]
  );

  const leaveChatHandler = async (roomId) => {
    try {
      await instance.delete(`/chat/room/exit/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  //알림 목록 불러오기
  const { data } = useQuery(
    "getchattinglist",
    () => getChattingList(`${postId}`),
    {
      onSuccess: (response) => {
        if (response) {
          setList(response);
        }
      },
    }
  );
  //   console.log(list.response);

  return (
    <div>
      <div>채팅이다!!</div>
      <div ref={messagesRef}>
        {chatlog.length !== 0 &&
          chatlog.map((item, i) => {
            if (item.sender === sender) {
              return (
                <div>
                  {item.sender}: {item.message}
                </div>
              );
            } else {
              return (
                <div>
                  {item.sender}: {item.message}
                </div>
              );
            }
          })}
        <div>
          <div>목록이다!!</div>
          {/* {list !== [] &&
            list?.map((item, i) => {
              return <div>{item.partner}</div>;
            })} */}
        </div>
        <form onSubmit={(event) => submitHandler(event)}>
          <input
            style={{ border: "1px solid red" }}
            name="chat"
            type="text"
            value={log}
            onChange={(event) => setLog(event.target.value)}
          />
          <button>전송</button>
        </form>
        <button onClick={() => leaveChatHandler(roomId)}>나가기</button>
      </div>
    </div>
  );
}

export default ExChatting;
