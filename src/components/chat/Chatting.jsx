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

  // NO.2 소켓 객체 생성------------------------------------------------
  useEffect(() => {
    wsURL.onopen = () => {
      websocket.subscribe(
        `/sub/chat/room/${roomId}`,
        (data) => {
          const newMessage = JSON.parse(data.body);
          const enterMsg = {
            type: "ENTER",
            roomId,
            sender: userinfo.nickname,
          };
          websocket.send(JSON.stringify(data));
          websocket.send("/pub/chat/enter", websocket, JSON.stringify(enterMsg));
          //데이터 파싱
        }
        // userinfo.AccessToken
      );
    };

    wsURL.onmessage = (event) => {
      const message = typeof JSON.parse(event.data);
      console.log("confirm : web socket message recieved", message);
      setAllMsg((preAllMsg) => [...preAllMsg, message]);
    };
    wsURL.onclose = () => {
      console.log("confirm : web socket disconnected");
    };
    return () => {
      wsURL.close();
    };
  }, [roomId]);

  const stompDisConnect = () => {
    try {
      // websocket.debug = null;
      websocket.disconnect(() => {
        websocket.unsubscribe("sub-0");
      }, userinfo.AccessToken);
    } catch (err) {}
  };

  const SendMessage = () => {
    websocket.debug = null;
    const data = {
      type: "TALK",
      roomId,
      sender: userinfo.nickname,
      message,
    };
    //예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
    websocket.send("/pub/chat/message", websocket, JSON.stringify(data));
  };
  //   websocket.send("/pub/chat/message", userinfo.AccessToken, JSON.stringify(data));

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
          <div>res : </div>
          <div>
            {allmsg.map((item) => {
              return <div>{JSON.stringify(item)}</div>;
            })}
          </div>
        </ul>
      </div>
      <div>
        <input type="text" value={message} onChange={onMsgChangeHandler} />
        <button onClick={onSendMsgHandler}>전송</button>
      </div>
    </div>
  );
}

// NO.1 소켓 객체 생성------------------------------------------------
// useEffect(() => {
//   if (!ws.current) {
//     ws.current = new WebSocket(webSocketUrl);
//     ws.current.onopen = () => {
//       console.log("connected to " + webSocketUrl);
//       setSocketConnected(true);
//     };
//     ws.current.onclose = (error) => {
//       console.log("disconnect from " + webSocketUrl);
//       console.log(error);
//     };
//     ws.current.onerror = (error) => {
//       console.log("connection error " + webSocketUrl);
//       console.log(error);
//     };
//     ws.current.onmessage = (evt) => {
//       const data = JSON.parse(evt.data);
//       console.log(data);
//       setItems((prevItems) => [...prevItems, data]);
//     };
//   }

//   return () => {
//     console.log("clean up");
//     // ws.current.close();
//   };
// }, []);

// // 소켓이 연결되었을 시에 send 메소드
// useEffect(() => {
//   if (socketConnected) {
//     ws.current.send(
//       JSON.stringify({
//         message: message,
//       })
//     );

//     setSendMsg(true);
//   }
// }, [socketConnected]);

// NO.3 소켓 객체 생성------------------------------------------------
// const stompConnect = () => {
//   try {
//     websocket.debug = null;
//     //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을
//     //console에 보여주는데 그것을 감추기 위한 debug

//     wsURL.connect(userinfo.AccessToken, () => {
//       wsURL.subscribe(
//         `/sub/chat/room/${roomId}`,
//         (data) => {
//           const newMessage = JSON.parse(data.body);
//           const enterMsg = {
//             type: "ENTER",
//             roomId,
//             sender: userinfo.nickname,
//           };
//           console.log(enterMsg);
//           console.log(newMessage);
//           websocket.send(JSON.stringify(enterMsg));
//           //데이터 파싱
//         },
//         userinfo.AccessToken
//       );
//     });
//   } catch (err) {}
// };
