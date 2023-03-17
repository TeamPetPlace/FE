import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NomalLogin } from "../../api/user";
import { removeCookie } from "../../api/cookie";
import { getMypage } from "../../api/mypage";

function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(
    "    https://us.123rf.com/450wm/sanek13744/sanek137441706/sanek13744170600240/80321806-%EB%B0%9C-%EC%9D%B8%EC%87%84-%EB%B2%A1%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B0%95%EC%95%84%EC%A7%80-%EB%98%90%EB%8A%94-%EA%B3%A0%EC%96%91%EC%9D%B4-pawprint-%EA%B7%B8%EB%A6%BC-%EA%B8%B4-%EA%B7%B8%EB%A6%BC%EC%9E%90%EA%B0%80%EC%9E%88%EB%8A%94-%EB%8F%99%EB%AC%BC.jpg?ver=6"
  );
  const queryClient = useQueryClient();
  const { data } = useQuery("getmypage", getMypage, {
    onSuccess: (response) => {
      setProfile(response.response.image);
    },
  });

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
            <StProfile src={profile} alt="img" />
            <div>닉네임</div>
            <StUserBar
              onMouseEnter={() => setDrop(!drop)}
              onMouseLeave={() => setDrop(!drop)}
            >
              ▼
              {drop && (
                <StUserCategory>
                  <StUserCh onClick={() => navigate("/mypage")}>
                    마이페이지
                  </StUserCh>
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
  z-index: 999;
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

const StProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 1px solid black;
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
