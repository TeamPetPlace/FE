import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";
import { postChatting } from "../api/main";
import { Chatting } from "../components/chat/Chatting";

function ChatRoom({ id }) {
  const [userinfo] = useCookies(["AccessToken", "nickname"]);
  const queryClient = useQueryClient();
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const getChattingMutation = useMutation(postChatting, {
    onSuccess: (response) => {
      console.log("채팅방 입장");
      console.log(response);
      queryClient.invalidateQueries("postChatting");
      setRoomId(response.data.roomId);
      setName(response.data.name);
    },
  });

  console.log(roomId);
  console.log(name);

  const onChatEnterHandler = (event) => {
    const postId = id;
    getChattingMutation.mutate(postId);
  };

  return (
    <div>
      <h1>ChatRoom</h1>
      <div>
        <div>채팅 리스트...</div>
        <button onClick={onChatEnterHandler}> 채팅 시작 </button>
        <div>id : {id}</div>
        <Chatting roomId={roomId} />
      </div>
    </div>
  );
}

export default ChatRoom;
