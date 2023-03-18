import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BusinessSignup, CheckBizNum, CheckEmail } from "../../api/user";

const BusinessSignupForm = () => {
  const [useremail, setUserEmail] = useState();
  const [usernickname, setUserNickName] = useState();
  const [userpassword, setUserpassword] = useState();
  const [biznumber, setBizNumber] = useState();
  const [uservalpassword, setValPassword] = useState();
  const [valbiznum, setValBizNum] = useState();
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [biznumcheck, setBizNumCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isBizNum, setIsBizNum] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidBiznum, setIsValidBizNum] = useState(false);
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,20}$/;
  const biznumberRegex = /^\d{3}-\d{2}-\d{5}$/;

  // 이메일 확인
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

  const onEmailChangeHandler = (e) => {
    const value = e.target.value;
    setUserEmail(value);
    emailRegex.test(value) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  //사업자번호 확인
  const checkBizNumlMutation = useMutation(CheckBizNum, {
    onSuccess: (response) => {
      response ? setIsBizNum(true) : setIsBizNum(false);
      if (response) {
        setIsBizNum(true);
        alert("ok, i got it");
      } else {
        setIsBizNum(false);
        alert("이미 등록된 사업자번호입니다.");
      }
    },
  });

  const checkBizNumber = (e) => {
    e.stopPropagation();
    if (!e.target.value.trim()) return;
    checkBizNumlMutation.mutate(e.target.value);
  };

  const onBizNumChangeHandler = (e) => {
    const value = e.target.value;
    setBizNumber(value);
    biznumberRegex.test(value) ? setIsValidBizNum(true) : setIsValidBizNum(false);
  };

  //비밀번호 확인
  const onPasswordChange = (e) => {
    const value = e.target.value;
    setUserpassword(value);
    value === uservalpassword ? setPasswordCheck(true) : setPasswordCheck(false);
    passwordRegex.test(value) ? setIsValidPassword(true) : setIsValidPassword(false);
  };

  // 가입
  const signUpMutation = useMutation(BusinessSignup, {
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
      business: biznumber,
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
          <div>사업자회원가입</div>
          <div>
            <Stinput
              type="text"
              name="Email"
              value={useremail}
              placeholder="이메일"
              onChange={onEmailChangeHandler}
            />
            <button type="button" disabled={!isValidEmail} value={useremail} onClick={checkEmail}>
              중복확인
            </button>
          </div>
        </div>
        <Stinput
          type="text"
          value={usernickname}
          name="Username"
          placeholder="닉네임"
          onChange={(e) => setUserNickName(e.target.value)}
        />{" "}
        <br />
        <p> 닉네임은 2자이상 20자 이내로 작성해주시기 바랍니다.</p>
        <Stinput
          type="text"
          name="Biznumber"
          value={biznumber}
          placeholder="000-00-00000의 형식으로 작성해주세요"
          onChange={onBizNumChangeHandler}
        />
        <button type="button" disabled={!isValidBiznum} value={biznumber} onClick={checkBizNumber}>
          사업자번호확인
        </button>{" "}
        <br />
        <Stinput
          type={userpassword}
          // type={pwType.type}
          value={userpassword}
          name="PassWord"
          placeholder="비밀번호"
          onChange={onPasswordChange}
        />
        {isValidPassword ? (
          <p style={{ color: "Black" }}>사용가능한 비밀번호 입니다.</p>
        ) : (
          <p style={{ color: "#ff6666" }}>영어,숫자,특수문자를 포함한 8자이상이여야 합니다.</p>
        )}
        <div>
          <Stinput
            // type="password"
            type="text"
            placeholder="비밀번호 확인"
            value={uservalpassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordcheck ? (
          <p style={{ color: "Black" }}>비밀번호 일치!</p>
        ) : (
          <p style={{ color: "#ff6666" }}>비밀번호 불일치!</p>
        )}
        <div>
          {/* <button disabled={!(passwordcheck && isValidPassword && isValidEmail)}> */}
          <button disabled={!(isValidBiznum && passwordcheck && isValidPassword && isValidEmail)}>
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

export default BusinessSignupForm;

const StSignupDiv = styled.div`
  margin: 100px auto;
  display: flex;
  padding: 50px;
  background-color: skyblue;
  width: 50%;
  height: 40%;
  flex-direction: column;
`;

const Stinput = styled.input`
  width: 70%;
`;
