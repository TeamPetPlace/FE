import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Tab from "../components/main/Tab/Tab";
import Banner from "../components/main/Banner/Banner";
import SecondBanner from "../components/main/Banner/SecondBanner";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "../api/cookie";
import { useQuery, useQueryClient } from "react-query";
import { getNotification } from "../api/main";

function Main() {
  // const [listening, setListening] = useState(false);
  // const [notification, setNotification] = useState([]);
  // let eventSource = undefined;

  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   if (!listening) {
  //     const AccessToken = getCookie("AccessToken");
  //     eventSource = new EventSourcePolyfill("https://petplace.site/subscribe", {
  //       headers: {
  //         Authorization: AccessToken,
  //       },
  //     });

  //     eventSource.onopen = (event) => {
  //       console.log("sse 구독 성공");
  //     };

  //     eventSource.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       const content = data.content;
  //       console.log(content);
  //       setNotification((old) => [...old, content]);
  //       console.log(notification);
  //     };

  // eventSource.addEventListener("message", (event) => {
  //   // const result = JSON.parse(event.data);
  //   const result = event;
  //   console.log("메세지 받았다", result);
  //   setData(result);
  // });

  //     eventSource.addEventListener("message", (event) => {
  //       const data = JSON.parse(event.data);
  //       const content = data.content;
  //       console.log(content);
  //       setNotification(content);
  //     });

  //     eventSource.onerror = (event) => {
  //       console.log(event.target.readyState);
  //       if (event.target.readyState === EventSource.CLOSED) {
  //         console.log("SSE 연결 종료 (" + event.target.readyState + ")");
  //       }
  //       eventSource.close();
  //     };
  //     setListening(true);
  //     eventSource.onerror = (event) => {
  //       console.log(event.target.readyState);
  //       if (event.target.readyState === EventSource.CLOSED) {
  //         console.log("SSE 연결 종료");
  //       } else {
  //         console.log("에러 발생", event);
  //         eventSource.close();
  //         setTimeout(() => {
  //           console.log("재시도");
  //           eventSource = new EventSourcePolyfill(
  //             "https://petplace.site/subscribe",
  //             {
  //               headers: {
  //                 Authorization: AccessToken,
  //               },
  //             }
  //           );
  //         }, 1000);
  //       }
  //     };
  //     setListening(true);
  //   }
  //   return () => {
  //     eventSource.close();
  //     console.log("닫혔다 !!!");
  //   };
  // }, []);

  return (
    <Layout>
      <Header />
      <Banner />
      <Tab />
      <SecondBanner />
      <Footer />
    </Layout>
  );
}

export default Main;
