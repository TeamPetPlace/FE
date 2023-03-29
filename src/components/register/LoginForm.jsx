import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setCookie } from "../../api/cookie";
import { KaKaoLogin, NomalLogin } from "../../api/user";
import Layout from "../common/Layout";
import animal_illust_back from "../../style/img/animal_illust_back.svg";
import logo from "../../style/img/logo.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const [valid, setValid] = useState(true);

  const onKaKaologin = () => {
    KaKaoLogin();
  };

  const loginMutation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      setCookie("loginType", response.data.response.loginType);
      setCookie("nickname", response.data.response.nickname);
      setCookie("email", email);
      setCookie("access_token", response.headers.authorization);
      setCookie("refresh_token", response.headers.refresh_token);
      alert("환영합니다");
      console.log(response);
      navigate("/main");
    },
    onError: (error) => {
      setValid(false);
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
      // alert("이메일을 확인해주세요!");
      setValid(false);
    } else if (!password.trim()) {
      // alert("비밀번호를 확인해주세요!");
      setValid(false);
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
                {valid ? null : (
                  <StDescDiv style={{ color: "#ff6666" }}>ID/PW가 일치하지 않습니다.</StDescDiv>
                )}
                <StBtn Border="1px solid #fee500">로그인</StBtn>
              </div>
            </form>
            <div>
              <StBtn Border="1px solid #fee500" onClick={onKaKaologin}>
                카카오 로그인
              </StBtn>
            </div>
            <StBtn
              onClick={() => {
                navigate("/signup");
              }}
              Border="1px solid #d9d9d9"
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
  border: ${(props) => props.Border};
  background-color: #fff;
  width: 410px;
  height: 52px;
  margin: 20px 124px 0px 124px;
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
  margin: 0px 124px 20px 124px;
  text-indent: 10px;
  outline: none;
`;

const StDescDiv = styled.div`
  font-size: 12px;
  margin: -15px 5px 10px 125px;
`;
