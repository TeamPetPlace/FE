import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

export function Chatting({ roomId }) {
  // const { roomId } = useParams();
  const queryClient = useQueryClient();
  // const [userName, setUserName] = useState();
  const [allmsg, setAllMsg] = useState([]);
  const [message, setMessage] = useState("");
  const [userinfo] = useCookies(["AccessToken", "nickname"]);

  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);

  const wsURL = new WebSocket(`wss://petplace.site/ws/place`);
  const websocket = StompJs.over(wsURL);

  let ws = useRef(null);

  // 소켓 객체 생성
  // React.useEffect(() => {
  //   wsURL.onopen = () => {
  //     console.log("WebSocket connected"); // 연결 성공 시 실행할 코드
  //   };

  //   wsURL.onmessage = (event) => {
  //     console.log(`Received message: ${event.data}`); // 메시지 수신 시 실행할 코드
  //   };

  //   wsURL.onclose = () => {
  //     console.log("WebSocket disconnected"); // 연결 종료 시 실행할 코드
  //   };

  //   return () => {
  //     // websocket.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
  //   };
  // }, []);

  const stompConnect = () => {
    try {
      // websocket.debug = null;
      //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을
      //console에 보여주는데 그것을 감추기 위한 debug
      websocket.connect(userinfo.AccessToken, () => {
        console.log("confirm : web socket connected");
        websocket.subscribe(
         '/sub/chat/room/' + roomId,
          (data) => {
            const newMessage = JSON.parse(data.body);
            //데이터 파싱
          },
          { Authorization: userinfo.AccessToken }
        );
        const enterMsg = {
          type: "ENTER",
          roomId: roomId,
          sender: userinfo.nickname,
        };
        websocket.send(JSON.stringify(enterMsg));
      });
    } catch (err) {}
  };

  // useEffect(() => {
  //   websocket.onopen = () => {
  //     console.log("confirm : web socket connected");
  //     const enterMsg = {
  //       type: "ENTER",
  //       roomId: roomId,
  //       sender: userinfo.nickname,
  //     };
  //     websocket.send(JSON.stringify(enterMsg));
  //   };
  //   websocket.onmessage = (event) => {
  //     const message = typeof JSON.parse(event.data);
  //     console.log("confirm : web socket message recieved", message);
  //     setAllMsg((preAllMsg) => [...preAllMsg, message]);
  //   };
  //   websocket.onclose = () => {
  //     console.log("confirm : web socket disconnected");
  //   };
  //   return () => {
  //     // websocket.close();
  //   };
  // }, [roomId, userinfo.nickname]);

  const stompDisConnect = () => {
    try {
      // websocket.debug = null;
      websocket.disconnect(() => {
        websocket.unsubscribe("sub-0");
      }, userinfo.AccessToken);
    } catch (err) {}
  };

  const SendMessage = () => {
    // websocket.debug = null;
    const data = {
      type: "TALK",
      roomId: roomId,
      sender: userinfo.nickname,
      message: message,
    };
    //예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
    websocket.send("/pub/chat/message", userinfo.AccessToken, JSON.stringify(data));
  };
  //웹소켓 데이터 전송 부분
  //웹소켓 disconnect-unsubscribe 부분
  // 웹소켓을 disconnect을 따로 해주지 않으면 계속 연결되어 있어서 사용하지 않을때는 꼭 연결을 끊어주어야한다.

  const onMsgChangeHandler = (event) => {
    setMessage(event.target.value);
  };
  const onSendMsgHandler = () => {
    const talkMsg = {
      type: "TALK",
      roomId,
      sender: userinfo.nickname,
      message,
    };
    websocket.send(JSON.stringify(talkMsg));
    setMessage("");
  };

  return (
    <div>
      <div> 채팅방 : {roomId}</div>
      <div>
        <ul>
          {allmsg.map((message, index) => (
            <li key={index}>
              {message.sender}: {message.message}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input type="text" value={message} onChange={onMsgChangeHandler} />
        <button onClick={onSendMsgHandler}>전송</button>
      </div>
    </div>
  );
}
