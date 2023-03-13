import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckEmail, UserSignup } from "../../api/user";

const UserSignupForm = () => {
  const [useremail, setUserEmail] = useState();
  const [usernickname, setUserNickName] = useState();
  const [userpassword, setUserpassword] = useState();
  const [uservalpassword, setValPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();

  //이메일 유효성
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //비밀번호 유효성
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  //닉네임 유효성
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,20}$/;
  //사업자번호
  const numberRegex = /^\d{3}-\d{2}-\d{5}$/;

  const checkEmailMutation = useMutation(CheckEmail, {
    onSuccess: (response) => {
      response ? setIsEmail(true) : setIsEmail(false);
      if (response) {
        setIsEmail(true);
        alert("사용가능한 이메일입니다.");
      } else {
        setIsEmail(false);
        alert("이미 사용중인 이메일입니다.");
      }
    },
  });

  const checkEmail = (e) => {
    e.stopPropagation();
    if (!e.target.value.trim()) return;
    checkEmailMutation.mutate(e.target.value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUserEmail(value);
    emailRegex.test(value) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  //비밀번호 확인
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserpassword(value);
    value === uservalpassword ? setPasswordCheck(true) : setPasswordCheck(false);
    passwordRegex.test(value) ? setIsValidPassword(true) : setIsValidPassword(false);
  };
  // 가입
  const signUpMutation = useMutation(UserSignup, {
    onSuccess: (response) => {
      // console.log(response.data);
      alert("회원가입 성공!");
      navigate("/");
      return response.data;
    },
    onError: (response) => {
      // console.log(response.data);
      alert("다시시도해주십시오!");
      return response.data;
    },
  });

  const onSignupSubmit = (e) => {
    e.preventDefault();
    const res = {
      email: useremail,
      password: userpassword,
      nickname: usernickname,
    };
    signUpMutation.mutate(res);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setValPassword(value);
    value === userpassword ? setPasswordCheck(true) : setPasswordCheck(false);
  };

  return (
    <StSignupDiv>
      <form onSubmit={onSignupSubmit}>
        <div>
          <div>일반회원가입</div>
          <div>
            <input
              type="text"
              name="Email"
              value={useremail}
              placeholder="이메일"
              onChange={handleEmailChange}
            />

            <button
              // id="check"
              type="button"
              disabled={!isValidEmail}
              value={useremail}
              onClick={checkEmail}
            >
              중복확인
            </button>
          </div>
        </div>

        <input
          type="text"
          value={usernickname}
          name="Username"
          placeholder="이름"
          onChange={(e) => setUserNickName(e.target.value)}
        />
        <input
          type={pwType.type}
          value={userpassword}
          name="PassWord"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
        />
        {isValidPassword ? (
          <p style={{ color: "White" }}>사용가능한 비밀번호 입니다.</p>
        ) : (
          <p style={{ color: "#ff6666" }}>영어,숫자,특수문자를 포함한 8자이상이여야 합니다.</p>
        )}
        <div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={uservalpassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordcheck ? (
          <p style={{ color: "#008000" }}>비밀번호 일치!</p>
        ) : (
          <p style={{ color: "#ff6666" }}>비밀번호 불일치!</p>
        )}
        <div>
          <button disabled={!(isNickName && passwordcheck && isValidPassword && isValidEmail)}>
            회원가입
          </button>
        </div>
      </form>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </button>
      </div>
    </StSignupDiv>
  );
};

export default UserSignupForm;

const StSignupDiv = styled.div`
  margin: 100px auto;
  display: flex;
  padding: 50px;
  background-color: pink;
  width: 30%;
  height: 300px;
  flex-direction: column;
`;
