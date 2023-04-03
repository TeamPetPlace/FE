import React, { useEffect } from "react";
import { useState } from "react";

function Notification() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource("");

      eventSource.onopen = (event) => {
        console.log("연결");
      };

      eventSource.onmessage = (event) => {
        console.log("결과", event.data);
        setData((old) => [...old, event.data]);
      };
    }
  });
  return <div>Notification</div>;
}

export default Notification;
