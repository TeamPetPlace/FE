import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NomalLogin } from "../../api/user";
import { getCookie, removeCookie } from "../../api/cookie";
import { getMypage, getNotificationCount } from "../../api/mypage";
import { useCookies } from "react-cookie";
import logo from "../../style/img/logo.svg";
import profileOrigin from "../../style/img/profile.svg";
import "../../style/fonts/font.css";
import { StContainer } from "../main/Banner/BannerStyle";
import { EventSourcePolyfill } from "event-source-polyfill/src/eventsource.min.js";
import { useEffect } from "react";
import Toast from "../../element/Toast";

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

  //드롭다운
  const [drop, setDrop] = useState(false);

  const logoutmuation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      [
        "AccessToken",
        "RefreshToken",
        "loginType",
        "email",
        "nickname",
        "lat",
        "lng",
      ].forEach((cookie) => removeCookie(cookie));
      alert("로그아웃 되었습니다");
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
        console.log("sse 구독 성공");
      };

      eventSource.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data);
          const content = data.content;
          console.log(content);
          setNotification(content);
          setToastState(true);
        } catch (error) {}
      });

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE 연결 종료");
        } else {
          console.log("에러 발생", event);
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

  const { data: countData } = useQuery(
    "getnotificationcount",
    getNotificationCount,
    {
      onSuccess: (response) => {
        setCount(response.count);
      },
    }
  );

  return (
    <>
      <StHeader>
        <StWrap>
          <StMenu>
            <StLogo src={logo} onClick={() => navigate("/main")} />
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

            <div>{nickname}</div>
            <StUserBar
              onMouseEnter={() => setDrop(!drop)}
              onMouseLeave={() => setDrop(!drop)}
            >
              ▼
              {drop && cookies.loginType === "BUSINESS" && (
                <StUserCategory>
                  <StUserMenu onClick={() => navigate("/mypage")}>
                    마이페이지
                  </StUserMenu>
                  {cookies.loginType === "BUSINESS" && (
                    <StUserMenu onClick={() => navigate("/notification")}>
                      알림함
                    </StUserMenu>
                  )}

                  <StUserMenu onClick={onLogoutHandler}>로그아웃</StUserMenu>
                </StUserCategory>
              )}
              {drop && cookies.loginType === "USER" && (
                <StUserCategorys>
                  <StUserMenu onClick={() => navigate("/mypage")}>
                    마이페이지
                  </StUserMenu>
                  {cookies.loginType === "BUSINESS" && (
                    <StUserMenu onClick={() => navigate("/notification")}>
                      알림함
                    </StUserMenu>
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
        <Toast
          setToastAnimation={setToastAnimation}
          setToastState={setToastState}
        />
      ) : null}
    </>
  );
}

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 6.3em;
  background-color: #ffd53f;
  box-shadow: 0px 4px 8px 1px rgba(254, 215, 0, 0.15);
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 99;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    height: 80px;
  }
`;

const StWrap = styled.div`
  width: 1235px;
  height: 37px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
  }
`;

const StMenu = styled.div`
  display: flex;
  width: 637px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 300px;
    margin: 0 auto;
    display: flex;
    position: relative;
  }
`;

const StLogo = styled.img`
  cursor: pointer;
  width: 182px;
  height: 37px;
  margin-left: 30px;
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 30px;
    position: absolute;
    top: -25px;
    left: 42%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 40px;
  }
`;

const StCateogry = styled.div`
  width: 316px;
  display: flex;
  justify-content: space-between;
  margin-left: 140px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 70px;
    width: 250px;
  }
`;

const StTab = styled.div`
  cursor: pointer;
  color: #0d0d0d;
  font-weight: 900;
  font-size: 20px;
  &:hover {
    font-weight: 900;
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StUser = styled.div`
  display: flex;
  width: 200px;
  line-height: 37px;
  font-size: 15px;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100px;
    font-size: 12px;
  }
`;

const StNotification = styled.div`
  display: flex;
`;

const StPoint = styled.div`
  color: #ee4a16;
  position: absolute;
  top: 18px;
  margin-left: 25px;
  @media screen and (max-width: 768px) {
    top: 15px;
    right: 50px;
  }
`;

const StProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StUserBar = styled.ul`
  position: relative;
  margin: 0px;
  height: 37px;
  &:hover {
    cursor: pointer;
    transition: all ease 2s 0s;
  }
  @media screen and (max-width: 768px) {
    margin-left: -10px;
    width: 10px;
  }
`;

const StUserCategory = styled.div`
  width: 100px;
  height: 110px;
  font-size: 14px;
  color: #999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 5%;

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 12px;
    height: 80px;
  }
`;

const StUserCategorys = styled.div`
  width: 100px;
  height: 75px;
  font-size: 14px;
  color: #999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 5%;

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 12px;
    height: 50px;
  }
`;

const StUserMenu = styled.li`
  list-style: none;
  width: 100px;
  text-align: center;
  &:hover {
    color: #000;
    font-weight: 900;
  }
  @media screen and (max-width: 768px) {
    height: 60px;
    margin-bottom: -30px;
    margin-top: -5px;
  }
`;

const StPlusDiv = styled.div`
  height: 100px;
  @media screen and (max-width: 768px) {
    height: 80px;
  }
`;
