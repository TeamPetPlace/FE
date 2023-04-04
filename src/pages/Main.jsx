import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Tab from "../components/main/Tab/Tab";
import Banner from "../components/main/Banner/Banner";
import SecondBanner from "../components/main/Banner/SecondBanner";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "../api/cookie";

function Main() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });
  const eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      const AccessToken = getCookie("AccessToken");
      const eventSource = new EventSourcePolyfill(
        "https://petplace.site/subscribe",
        {
          headers: {
            Authorization: AccessToken,
          },
        }
      );
      eventSource.onmessage = (event) => {
        console.log("SSE 구독 성공", event.data);
        setData(event.data);
      };

      eventSource.addEventListener("message", (event) => {
        // const result = JSON.parse(event.data);
        const result = event;
        console.log("메세지 받았다", result);
        setData(result);
      });

      eventSource.addEventListener("error", (event) => {
        if (event) {
          console.log(event);
        }
        eventSource.close();
      });
      // setEventSource(eventSource);
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Banner />
      <div>
        sse 메세지
        <span></span>
      </div>
      <Tab />
      <SecondBanner />
      <Footer />
    </Layout>
  );
}

export default Main;
