import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setCookie } from "../../api/cookie";
import { KaKaoLogin, NomalLogin } from "../../api/user";
import Layout from "../common/Layout";
import animal_illust_back from "../../style/img/animal_illust_back.svg";
import logo from "../../style/img/logo.svg";
import KaKaoLoginBtn from "../../style/img/kakao_login_large_wide.png";
import Button from "../../element/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const [valid, setValid] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onKaKaologin = () => {
    KaKaoLogin();
  };

  const loginMutation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      setIsLoggedIn(true);
      setCookie("loginType", response.data.response.loginType);
      setCookie("nickname", response.data.response.nickname);
      setCookie("email", email);
      setCookie("AccessToken", response.headers.authorization);
      setCookie("RefreshToken", response.headers.refreshtoken);
      alert("환영합니다");
      // console.log(response);
      navigate("/main");
    },
    onError: (error) => {
      setValid(false);
      // console.log(error);
      alert("로그인 실패");
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
                  <StDescDiv style={{ color: "#ff6666" }}>
                    ID/PW가 일치하지 않습니다.
                  </StDescDiv>
                )}
                <Button size="login" Border="1px solid #fee500">
                  로그인
                </Button>
              </div>
            </form>
            <div>
              {/* <img
                src={KaKaoLoginBtn}
                onClick={onKaKaologin}
                style={{
                  width: "410px",
                  height: "52px",
                  border: "1px solid #fee500",
                  margin: "20px 124px 0px 124px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              /> */}
              <Button
                size="login"
                style={{ color: "grey" }}
                Border="1px solid #fee500"
                onClick={onKaKaologin}
              >
                카카오 로그인 (구현중)
              </Button>
            </div>
            <Button
              size="login"
              onClick={() => {
                navigate("/signup");
              }}
              Border="1px solid #d9d9d9"
            >
              회원가입
            </Button>
          </>
        </StLoginDiv>
      </StLoginFormDiv>
    </Layout>
  );
};

export default LoginForm;
const StLoginFormDiv = styled.div`
  width: 100%;
  height: auto;
  ailgn-item: center;
  min-height: 1100px;
  margin: auto;
  display: flex;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #fffcec;
  background-image: url(${animal_illust_back});
  @media screen and (max-width: 767px) {
    background-size: 500px 900px;
    background-position: center top 30px;
    background-color: #fffcec;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    background-size: 1000px 1000px;
    background-position: center top 80px;
    background-color: #fffcec;
  }
`;

const StLoginDiv = styled.div`
  width: 660px;
  height: 580px;
  margin: 120px auto;
  display: flex;
  background-color: white;
  box-shadow: 1px 1px 15px 0px #ffeba2;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 450px;
    margin: 50px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 500px;
    height: 450px;
    margin: 200px auto;
  }
`;

const StTitle = styled.div`
  width: 210px;
  height: 44px;
  margin: 54px auto;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 767px) {
    width: 150px;
    height: 45px;
    background-size: 150px;
    margin: 30px auto 20px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 150px;
    height: 40px;
    background-size: 150px;
    margin: 30px auto;
  }
`;

const StBtn = styled.button`
  border: ${(props) => props.Border};
  background-color: #fff;
  width: 414px;
  height: 52px;
  margin: 20px 124px 0px 124px;
  font-size: 22px;
  border-radius: 5px;
  color: #000000;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #6d6d6d;
  }
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 40px;
    margin: 10px 50px 10px 50px;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 45px;
    margin: 10px 100px 10px 100px;
    font-size: 13px;
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
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 40px;
    margin: 10px 50px 10px 50px;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 45px;
    margin: 0px 100px 10px 100px;
    font-size: 13px;
  }
`;

const StDescDiv = styled.div`
  font-size: 12px;
  margin: -15px 5px 10px 125px;
  @media screen and (max-width: 767px) {
    margin: -5px 5px 10px 50px;
    font-size: 8px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: -5px 5px 5px 60px;
    font-size: 10px;
  }
`;
