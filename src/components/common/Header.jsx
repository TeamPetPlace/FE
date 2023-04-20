import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { NomalLogin } from "../../api/user";
import { getCookie, removeCookie } from "../../api/cookie";
import { getMypage, getNotificationCount } from "../../api/mypage";
import { useCookies } from "react-cookie";
import logo from "../../style/img/logo.svg";
import profileOrigin from "../../style/img/profile.svg";
import { EventSourcePolyfill } from "event-source-polyfill/src/eventsource.min.js";
import { useEffect } from "react";
import Toast from "../../element/Toast";
import {
  StHeader,
  StWrap,
  StMenu,
  StLogo,
  StCateogry,
  StTab,
  StUser,
  StNotification,
  StPoint,
  StProfile,
  StUserBar,
  StUserCategory,
  StUserCategorys,
  StUserMenu,
  StPlusDiv,
  StNickdiv,
} from "./CommonStyle";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(
    "    https://us.123rf.com/450wm/sanek13744/sanek137441706/sanek13744170600240/80321806-%EB%B0%9C-%EC%9D%B8%EC%87%84-%EB%B2%A1%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B0%95%EC%95%84%EC%A7%80-%EB%98%90%EB%8A%94-%EA%B3%A0%EC%96%91%EC%9D%B4-pawprint-%EA%B7%B8%EB%A6%BC-%EA%B8%B4-%EA%B7%B8%EB%A6%BC%EC%9E%90%EA%B0%80%EC%9E%88%EB%8A%94-%EB%8F%99%EB%AC%BC.jpg?ver=6"
  );
  const [nickname, setNickname] = useState("");
  const { data } = useQuery("getmypage", getMypage, {
    onSuccess: (response) => {
      setProfile(response.response.image);
      setNickname(response.response.nickname);
    },
  });

  //token check
  useEffect(() => {
    const CheckToken = getCookie("RefreshToken");

    if (CheckToken !== null) {
      const decoded = jwtDecode(CheckToken);

      function TokenExpire() {
        const exp = Number(decoded.exp + "000");
        const expTime = new Date(exp);
        const now = new Date();

        if (expTime <= now) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "세션이 만료되었습니다. 다시 로그인해주세요.",
            confirmButtonColor: "#FFD53F",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            } else {
              return;
            }
          });
          ["AccessToken", "RefreshToken", "loginType", "email", "nickname", "lat", "lng"].forEach(
            (cookie) => removeCookie(cookie)
          );
        } else {
          setTimeout(() => {
            TokenExpire();
          }, expTime - now);
        }
      }

      TokenExpire();
    }
  }, []);

  //드롭다운
  const [drop, setDrop] = useState(false);

  const logoutmuation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      ["AccessToken", "RefreshToken", "loginType", "email", "nickname", "lat", "lng"].forEach(
        (cookie) => removeCookie(cookie)
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "로그아웃 되었습니다.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
      navigate("/");
    },
  });

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutmuation.mutate();
  };

  const [cookies] = useCookies(["AccessToken", "loginType"]);

  const [notification, setNotification] = useState([]);
  let eventSource = undefined;

  const [toastState, setToastState] = useState(false);
  const [toastAnimation, setToastAnimation] = useState("toast-alert");

  useEffect(() => {
    const accessToken = getCookie("AccessToken");

    const openEventSource = () => {
      eventSource = new EventSourcePolyfill("https://petplace.site/subscribe", {
        headers: {
          Authorization: accessToken,
        },
        withCredentials: true,
      });

      eventSource.onopen = (event) => {
        // console.log("sse 구독 성공");
      };

      eventSource.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data);
          const content = data.content;
          // console.log(content);
          setNotification(content);
          setToastState(true);
        } catch (error) {}
      });

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          // console.log("SSE 연결 종료");
        } else {
          // console.log("에러 발생", event);
          eventSource.close();
          setTimeout(openEventSource, 3000);
        }
      };
    };

    if (cookies.loginType === "BUSINESS") {
      openEventSource();
    }
    // openEventSource();

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  //알림 개수 불러오기

  const [count, setCount] = useState();

  const { data: countData } = useQuery("getnotificationcount", getNotificationCount, {
    onSuccess: (response) => {
      setCount(response.count);
    },
  });

  return (
    <>
      <StHeader>
        <StWrap>
          <StMenu>
            <StLogo alt="logo" src={logo} onClick={() => navigate("/main")} />
            <StCateogry>
              <StTab onClick={() => navigate("/hospital")}>병원</StTab>
              <StTab onClick={() => navigate("/shop")}>미용</StTab>
              <StTab onClick={() => navigate("/cafe")}>카페</StTab>
            </StCateogry>
          </StMenu>
          <StUser>
            <StNotification>
              {profile === null ? (
                <StProfile src={profileOrigin} alt="origin" />
              ) : (
                <StProfile src={profile} alt="img" />
              )}
              {cookies.loginType === "BUSINESS" && count > 0 ? (
                <StPoint>●</StPoint>
              ) : cookies.loginType === "BUSINESS" && count == 0 ? null : null}
            </StNotification>

            <StNickdiv>{nickname}</StNickdiv>
            <StUserBar onMouseEnter={() => setDrop(!drop)} onMouseLeave={() => setDrop(!drop)}>
              ▼
              {drop && cookies.loginType === "BUSINESS" && (
                <StUserCategory>
                  <StUserMenu onClick={() => navigate("/mypage")}>마이페이지</StUserMenu>
                  {cookies.loginType === "BUSINESS" && (
                    <StUserMenu onClick={() => navigate("/notification")}>알림함</StUserMenu>
                  )}

                  <StUserMenu onClick={onLogoutHandler}>로그아웃</StUserMenu>
                </StUserCategory>
              )}
              {drop && cookies.loginType === "USER" && (
                <StUserCategorys>
                  <StUserMenu onClick={() => navigate("/mypage")}>마이페이지</StUserMenu>
                  {cookies.loginType === "BUSINESS" && (
                    <StUserMenu onClick={() => navigate("/notification")}>알림함</StUserMenu>
                  )}

                  <StUserMenu onClick={onLogoutHandler}>로그아웃</StUserMenu>
                </StUserCategorys>
              )}
            </StUserBar>
          </StUser>
        </StWrap>
      </StHeader>
      <StPlusDiv></StPlusDiv>
      {toastState === true ? (
        <Toast setToastAnimation={setToastAnimation} setToastState={setToastState} />
      ) : null}
    </>
  );
}

export default Header;
