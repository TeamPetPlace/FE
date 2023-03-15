import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { NomalLogin } from "../../api/user";
import { removeCookie } from "../../api/cookie";

function Header() {
  const navigate = useNavigate();
  //드롭다운
  const [drop, setDrop] = useState(false);

  const logoutmuation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      removeCookie("access_token");
      removeCookie("refresh_token");
      alert("로그아웃 되었습니다");
      window.location.href = "/";
    },
  });

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutmuation.mutate();
  };

  return (
    <Layout>
      <StHeader>
        <StWrap>
          <StMenu>
            <StLogo onClick={() => navigate("/main")}>로고</StLogo>
            <StTab onClick={() => navigate("/hospital")}>병원</StTab>
            <StTab onClick={() => navigate("/shop")}>미용</StTab>
            <StTab onClick={() => navigate("/cafe")}>카페</StTab>
          </StMenu>
          <StUser>
            <div>프로필</div>
            <div>닉네임</div>
            <StUserBar onMouseEnter={() => setDrop(!drop)} onMouseLeave={() => setDrop(!drop)}>
              ▼
              {drop && (
                <StUserCategory>
                  <StUserCh onClick={() => navigate("/mypage")}>마이페이지</StUserCh>
                  <StUserCh onClick={onLogoutHandler}>로그아웃</StUserCh>
                </StUserCategory>
              )}
            </StUserBar>
          </StUser>
        </StWrap>
      </StHeader>
    </Layout>
  );
}

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 4.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StWrap = styled.div`
  width: 1100px;
  display: flex;
  justify-content: space-between;
`;

const StMenu = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  position: relative;
`;

const StLogo = styled.div`
  cursor: pointer;
`;

const StTab = styled.div`
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

const StUser = styled.div`
  display: flex;
  gap: 10px;
`;

const StUserCategory = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100px;
  position: absolute;
  right: 5%;
`;

const StUserBar = styled.ul`
  position: absolute;
  top: 1.3%;
  right: 11%;
  &:hover {
    cursor: pointer;
    transition: all ease 2s 0s;
  }
`;

const StUserCh = styled.li`
  list-style: none;
  width: 100px;
  text-align: center;
  padding: 5px 0px;
  &:hover {
    background-color: lightgray;
  }
`;
