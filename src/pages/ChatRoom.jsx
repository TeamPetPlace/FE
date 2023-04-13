import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getChattingList, postChatting } from "../api/main";

import ExChatting from "../components/chat/ExChatting";
import Chatting from "../components/chat/Chatting";

function ChatRoom({ id }) {
  const [userinfo] = useCookies(["AccessToken", "nickname"]);
  const queryClient = useQueryClient();
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [list, setList] = useState([]);

  const getChattingMutation = useMutation(postChatting, {
    onSuccess: (response) => {
      console.log("채팅방 입장");
      console.log(response);
      queryClient.invalidateQueries("postChatting");
      setRoomId(response.data);
      console.log(response.data);
    },
  });

  console.log(roomId);
  console.log(id);

  const onChatEnterHandler = () => {
    getChattingMutation.mutate(id);
  };

  return (
    <div>
      <h1>ChatRoom</h1>
      <div>
        <div>채팅 리스트...</div>
        <button onClick={onChatEnterHandler}> 채팅 시작 </button>
        <div>id : {id}</div>
        <Chatting roomId={roomId} postId={id} />
      </div>
    </div>
  );
}

export default ChatRoom;
