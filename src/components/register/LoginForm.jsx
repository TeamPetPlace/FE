import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setCookie } from "../../api/cookie";
import { NomalLogin } from "../../api/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });

  const loginMutation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      setCookie("access_token", response.headers.authorization);
      window.location.href = "/main";
    },
    onError: (response) => {},
  });

  const onLoginSubmit = (event) => {
    event.prevenDefault();
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
            value={email}
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={pwType.type}
            value={password}
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>로그인</button>
        </div>
      </form>
      <div>
        <StkakaoBtn>카카오 로그인</StkakaoBtn>
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
