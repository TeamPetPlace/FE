import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NomalLogin } from "../../api/user";
import { removeCookie } from "../../api/cookie";
import { getMypage } from "../../api/mypage";
import { useCookies } from "react-cookie";
import logo from "../../style/img/logo.png";
import profileOrigin from "../../style/img/profile.png";
import "../../style/fonts/font.css";

function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(
    "    https://us.123rf.com/450wm/sanek13744/sanek137441706/sanek13744170600240/80321806-%EB%B0%9C-%EC%9D%B8%EC%87%84-%EB%B2%A1%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B0%95%EC%95%84%EC%A7%80-%EB%98%90%EB%8A%94-%EA%B3%A0%EC%96%91%EC%9D%B4-pawprint-%EA%B7%B8%EB%A6%BC-%EA%B8%B4-%EA%B7%B8%EB%A6%BC%EC%9E%90%EA%B0%80%EC%9E%88%EB%8A%94-%EB%8F%99%EB%AC%BC.jpg?ver=6"
  );
  const [nickname, setNickname] = useState("");
  const queryClient = useQueryClient();
  const { data } = useQuery("getmypage", getMypage, {
    onSuccess: (response) => {
      setProfile(response.response.image);
      setNickname(response.response.nickname);
    },
  });

  const [cookies] = useCookies(["access_token", "nickname"]);

  //드롭다운
  const [drop, setDrop] = useState(false);

  const logoutmuation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      removeCookie("access_token");
      removeCookie("refresh_token");
      removeCookie("loginType");
      removeCookie("email");
      removeCookie("nickname");
      removeCookie("lat");
      removeCookie("lng");
      alert("로그아웃 되었습니다");
      window.location.href = "/";
    },
  });

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutmuation.mutate();
  };

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
            {profile === null ? (
              <StProfile src={profileOrigin} alt="origin" />
            ) : (
              <StProfile src={profile} alt="img" />
            )}

            <div>{nickname}</div>
            <StUserBar
              onMouseEnter={() => setDrop(!drop)}
              onMouseLeave={() => setDrop(!drop)}
            >
              ▼
              {drop && (
                <StUserCategory>
                  <StUserMenu onClick={() => navigate("/mypage")}>
                    마이페이지
                  </StUserMenu>
                  <StUserMenu onClick={onLogoutHandler}>로그아웃</StUserMenu>
                </StUserCategory>
              )}
            </StUserBar>
          </StUser>
        </StWrap>
      </StHeader>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ffd53f;
  box-shadow: 0px 4px 8px 1px rgba(254, 215, 0, 0.15);
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 999;
`;

const StWrap = styled.div`
  width: 1235px;
  height: 37px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const StMenu = styled.div`
  display: flex;
  width: 637px;
  position: relative;
`;

const StLogo = styled.img`
  cursor: pointer;
  width: 182px;
  height: 37px;
`;

const StCateogry = styled.div`
  width: 316px;
  display: flex;
  justify-content: space-between;
  margin-left: 140px;
`;

const StTab = styled.div`
  cursor: pointer;
  color: #0d0d0d;
  font-size: 20px;
  &:hover {
    font-weight: 900;
  }
`;

const StUser = styled.div`
  display: flex;
  width: 135px;
  line-height: 37px;
  font-size: 15px;
`;

const StProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;

const StUserBar = styled.ul`
  position: relative;
  margin: 0px;
  height: 37px;
  &:hover {
    cursor: pointer;
    transition: all ease 2s 0s;
  }
`;

const StUserCategory = styled.div`
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
`;

const StUserMenu = styled.li`
  list-style: none;
  width: 100px;
  text-align: center;
  &:hover {
    color: #000;
    font-weight: 900;
  }
`;
