import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setCookie } from "../../api/cookie";
import { KaKaoLogin, NomalLogin } from "../../api/user";
import Layout from "../common/Layout";
import animal_illust_back from "../../style/img/animal_illust_back.svg";
import logo from "../../style/img/logo.png";

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
      setCookie("nickname", response.data.response.nickname);
      setCookie("email", email);
      setCookie("access_token", response.headers.authorization);
      // setCookie("refresh_token", response.headers.refresh_token);
      alert("로그인 성공");
      console.log(response);
      navigate("/main");
    },
    onError: (error) => {
      console.log(error);
      // alert("로그인 실패");
    },
  });

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
    <Layout>
      <StLoginFormDiv>
        <StLoginDiv>
          <>
            <form onSubmit={onLoginSubmit}>
              <StTitle />
              <div>
                <StInput
                  type="text"
                  value={email || ""}
                  name="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <StInput
                  type={pwType.type}
                  value={password || ""}
                  name="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <StBtn style={{ border: "None" }} backgroundColor="#ffd53f">
                  로그인
                </StBtn>
              </div>
            </form>
            <div>
              <StBtn backgroundColor="White" onClick={onKaKaologin}>
                카카오 로그인
              </StBtn>
            </div>
            <StBtn
              onClick={() => {
                navigate("/signup");
              }}
              backgroundColor="White"
            >
              회원가입
            </StBtn>
          </>
        </StLoginDiv>
      </StLoginFormDiv>
    </Layout>
  );
};

export default LoginForm;

const StLoginFormDiv = styled.div`
  width: 1920px;
  height: 1080px;
  margin: auto;
  /* background-color: #fffcec; */
  background-image: url(${animal_illust_back});
  display: flex;
`;

const StLoginDiv = styled.div`
  width: 660px;
  height: 580px;
  margin: 120px auto;
  display: flex;
  background-color: white;
  box-shadow: 1px 1px 15px 0px #ffeba2;
  flex-direction: column;
`;

const StTitle = styled.div`
  width: 210px;
  height: 44px;
  margin: 54px auto;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
`;

const StBtn = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid #d9d9d9;
  width: 410px;
  height: 52px;
  margin: 23px 124px 0px 124px;
  font-size: 22px;
  /* border: none; */
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #6d6d6d;
  }
`;

const StInput = styled.input`
  border-radius: 5px;
  width: 410px;
  height: 52px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  margin: 0px 124px 5px 124px;
  text-indent: 10px;
  outline: none;
`;
