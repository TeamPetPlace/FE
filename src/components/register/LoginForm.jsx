import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axios";
import { setCookie } from "../../api/cookie";
import { KaKaoLogin, NomalLogin } from "../../api/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });

  const onKaKaologin = () => {
    KaKaoLogin();
  };

  const loginMutation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      setCookie("loginType", response.data.response.loginType);
      setCookie("email", email);
      setCookie("access_token", response.headers.authorization);
      setCookie("refresh_token", response.headers.refresh_token);

      alert("로그인 성공");
      console.log(response);
      navigate("/main");
    },
    onError: (error) => {
      alert("로그인 실패");
    },
  });
  // console.log(type);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const res = {
      email,
      password,
    };
    if (!email.trim()) {
      alert("이메일을 확인해주세요!");
    } else if (!password.trim()) {
      alert("비밀번호를 확인해주세요!");
    }
    loginMutation.mutate(res);
  };

  return (
    <StLoginDiv>
      <form onSubmit={onLoginSubmit}>
        <div>
          <input
            type="text"
            value={email || ""}
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            // type={pwType.type}
            type="text"
            value={password || ""}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>로그인</button>
        </div>
      </form>
      <div>
        <StkakaoBtn onClick={onKaKaologin}>카카오 로그인</StkakaoBtn>
      </div>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </StLoginDiv>
  );
};

export default LoginForm;

const StLoginDiv = styled.div`
  margin: 100px auto;
  display: flex;
  padding: 50px;
  background-color: gray;
  width: 30%;
  height: 300px;
  flex-direction: column;
`;

const StkakaoBtn = styled.button`
  background-color: yellow;
  width: 90%;
  height: 50px;
`;
