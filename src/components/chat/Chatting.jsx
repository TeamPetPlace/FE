import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Chatting() {
  const { roomId } = useParams();
  const [userName, setUserName] = useState();
  const [message, setMessage] = useState([]);

  return <div>Chatting</div>;
}

export default Chatting;
