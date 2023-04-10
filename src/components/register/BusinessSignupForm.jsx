import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BusinessSignup, CheckBizNum, CheckEmail } from "../../api/user";
import { StSignupDiv, StInput, StDescDiv, StLoginMove } from "./SignupStyle";
import Button from "../../element/Button";

const BusinessSignupForm = () => {
  const [useremail, setUserEmail] = useState();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [usernickname, setUserNickName] = useState();
  const [uservalnick, setUserValNick] = useState();
  const [nicknamecheck, setNickNameCheck] = useState(false);
  const [isVaildNickName, setIsVaildNickName] = useState(false);
  const [userpassword, setUserpassword] = useState();
  const [uservalpassword, setValPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [pwType, setPwType] = useState({
    type: "password",
    visible: false,
  });
  const [biznumber, setBizNumber] = useState("");
  const [valbiznum, setValBizNum] = useState();
  const [biznumcheck, setBizNumCheck] = useState(false);
  const [isBizNum, setIsBizNum] = useState(false);
  const [isValidBiznum, setIsValidBizNum] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,10}$/;
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

  //닉네임 확인
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUserNickName(value);
    value === uservalnick ? setNickNameCheck(true) : setNickNameCheck(false);
    nickRegex.test(value)
      ? setIsVaildNickName(true)
      : setIsVaildNickName(false);
  };

  //사업자번호 확인
  const checkBizNumlMutation = useMutation(CheckBizNum, {
    onSuccess: (response) => {
      response ? setIsBizNum(true) : setIsBizNum(false);
      if (response) {
        setIsBizNum(true);
        alert("확인되었습니다.");
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
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);

    if (value.length >= 10) {
      const newValue = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(
        5
      )}`;
      setBizNumber(newValue);
      biznumberRegex.test(value)
        ? setIsValidBizNum(false)
        : setIsValidBizNum(true);
    } else if (value.length >= 5) {
      const newValue = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(
        5
      )}`;
      setBizNumber(newValue);
      setIsValidBizNum(false);
    } else if (value.length >= 2) {
      const newValue = `${value.slice(0, 2)}-${value.slice(2)}`;
      setBizNumber(newValue);
      setIsValidBizNum(false);
    } else {
      setBizNumber(value);
      setIsValidBizNum(false);
    }
  };

  //비밀번호 확인
  const onPasswordChange = (e) => {
    const value = e.target.value;
    setUserpassword(value);
    value === uservalpassword
      ? setPasswordCheck(true)
      : setPasswordCheck(false);
    passwordRegex.test(value)
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
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

  useEffect(() => {
    if (biznumber.length === 11) {
      setBizNumber(biznumber.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3"));
    }
    if (biznumber.length === 10) {
      setBizNumber(biznumber.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3"));
    }
  }, [biznumber]);

  const onBizNumPress = (e) => {
    const regex = /^[0-9\b -]{0,10}$/;
    if (regex.test(e.target.value)) {
      setBizNumber(e.target.value);
    }
  };

  return (
    <StSignupDiv>
      <form onSubmit={onSignupSubmit}>
        {/* <div>사업자회원가입</div> */}
        <div>
          <StInput
            Width="350px"
            type="text"
            name="Email"
            value={useremail || ""}
            placeholder="이메일"
            onChange={onEmailChangeHandler}
          />
          <Button
            size="signup"
            type="button"
            disabled={!isValidEmail}
            value={useremail}
            onClick={checkEmail}
          >
            중복확인
          </Button>
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
          <StDescDiv style={{ color: "#008000" }}>
            사용가능한 닉네임입니다.
          </StDescDiv>
        ) : (
          <StDescDiv style={{ color: "#ff6666" }}>
            특수문자를 제외하고 2자 이상 10자 이하여야 합니다.
          </StDescDiv>
        )}
        <StInput
          Width="350px"
          type="text"
          name="Biznumber"
          value={biznumber || ""}
          placeholder="사업자 번호"
          onKeyPress={onBizNumPress}
          onChange={onBizNumChangeHandler}
        />
        <Button
          size="signup"
          type="button"
          disabled={!isValidBiznum}
          value={biznumber}
          onClick={checkBizNumber}
        >
          사업자번호확인
        </Button>{" "}
        <StInput
          Width="500px"
          // type={userpassword}
          type={pwType.type}
          value={userpassword || ""}
          name="PassWord"
          placeholder="비밀번호"
          onChange={onPasswordChange}
        />
        {isValidPassword ? (
          <StDescDiv style={{ color: "Black" }}>
            사용가능한 비밀번호 입니다.
          </StDescDiv>
        ) : (
          <StDescDiv style={{ color: "#ff6666" }}>
            영어,숫자,특수문자를 포함한 8자이상이여야 합니다.
          </StDescDiv>
        )}
        <div>
          <StInput
            Width="500px"
            type="password"
            // type="text"
            placeholder="비밀번호 확인"
            value={uservalpassword || ""}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {passwordcheck ? (
          <StDescDiv style={{ color: "#008000" }}>
            비밀번호가 일치합니다.
          </StDescDiv>
        ) : (
          <StDescDiv style={{ color: "#ff6666" }}>
            비밀번호가 일치하지 않습니다.
          </StDescDiv>
        )}
        <div>
          <Button
            size="login"
            style={{ backgroundColor: "#ffd53f" }}
            disabled={
              !(
                passwordcheck &&
                isValidPassword &&
                isValidEmail &&
                isVaildNickName
              )
            }
          >
            회원가입
          </Button>
        </div>
      </form>
      <div>
        <StLoginMove>
          이미 가입하셨다면? <Link to="/">로그인하기</Link>
        </StLoginMove>
      </div>
    </StSignupDiv>
  );
};

export default BusinessSignupForm;
