import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CheckEmail, UserSignup } from "../../api/user";
import {
  StSignupFormDiv,
  StSignupDiv,
  StTitle,
  StSignupBtn,
  StInput,
  StCheckBtn,
  StDescDiv,
  StInputDiv,
} from "./SignupStyle";

const UserSignupForm = () => {
  const navigate = useNavigate();
  const [useremail, setUserEmail] = useState();
  const [isEmail, setIsEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [userpassword, setUserpassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [uservalpassword, setValPassword] = useState();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const [usernickname, setUserNickName] = useState();
  const [uservalnick, setUserValNick] = useState();
  const [nicknamecheck, setNickNameCheck] = useState(false);
  const [isVaildNickName, setIsVaildNickName] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,20}$/;

  const checkEmailMutation = useMutation(CheckEmail, {
    onSuccess: (response) => {
      response ? setIsEmail(true) : setIsEmail(false);
      if (response) {
        console.log(response);
        setIsEmail(true);
        alert("사용 가능한 이메일입니다.");
      } else {
        setIsEmail(false);
        alert("이미 사용중인 이메일입니다.");
      }
    },
  });

  // 이메일 확인
  const checkEmail = (e) => {
    e.stopPropagation();
    if (!e.target.value.trim()) return;
    checkEmailMutation.mutate(e.target.value);
  };

  const onEmailChange = (e) => {
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

  //닉네임 확인
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUserNickName(value);
    value === uservalnick ? setNickNameCheck(true) : setNickNameCheck(false);
    nickRegex.test(value) ? setIsVaildNickName(true) : setIsVaildNickName(false);
  };

  // 가입
  const signUpMutation = useMutation(UserSignup, {
    onSuccess: (response) => {
      // console.log(response.data);
      alert("펫플레이스에 방문하신것을 환영합니다");
      navigate("/");
      return response.data;
    },
    onError: (response) => {
      // console.log(response.data);
      alert("다시 시도해주십시오!");
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
      {/* <StTitle>회원가입</StTitle> */}
      <form onSubmit={onSignupSubmit}>
        <StInputDiv Margin_B="30px">
          <div>
            <StInput
              Width="350px"
              type="text"
              name="Email"
              value={useremail || ""}
              placeholder="이메일"
              onChange={onEmailChange}
            />
            <StCheckBtn
              type="button"
              disabled={!isValidEmail || ""}
              value={useremail}
              onClick={checkEmail}
            >
              중복확인
            </StCheckBtn>
          </div>
          <StInput
            Width="500px"
            type="text"
            value={usernickname || ""}
            name="Username"
            placeholder="닉네임"
            onChange={handleNicknameChange}
          />
          {isVaildNickName ? (
            <StDescDiv style={{ color: "#008000" }}>사용가능한 닉네임입니다.</StDescDiv>
          ) : (
            <StDescDiv style={{ color: "#ff6666" }}>
              특수문자를 제외하고 2자 이상 20자 이하여야 합니다.
            </StDescDiv>
          )}
          <StInput
            Width="500px"
            type={pwType.type}
            value={userpassword || ""}
            name="PassWord"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
          />
          {isValidPassword ? (
            <StDescDiv style={{ color: "#008000" }}>사용가능한 비밀번호 입니다.</StDescDiv>
          ) : (
            <StDescDiv style={{ color: "#ff6666" }}>
              영어,숫자,특수문자를 포함한 8자이상이여야 합니다.
            </StDescDiv>
          )}
          <div>
            <StInput
              Width="500px"
              type="password"
              placeholder="비밀번호 확인"
              value={uservalpassword || ""}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          {passwordcheck ? (
            <StDescDiv style={{ color: "#008000" }}>비밀번호가 일치합니다.</StDescDiv>
          ) : (
            <StDescDiv style={{ color: "#ff6666" }}>비밀번호가 일치하지 않습니다.</StDescDiv>
          )}
        </StInputDiv>
        <StSignupBtn
          // BackColor="#ffd53f"
          disabled={!(passwordcheck && isValidPassword && isValidEmail)}
        >
          회원가입
        </StSignupBtn>
      </form>
      <div>
        <StSignupBtn
          // BackColor="white"
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </StSignupBtn>
      </div>
    </StSignupDiv>
  );
};

export default UserSignupForm;
