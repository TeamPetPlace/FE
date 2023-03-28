import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import BusinessSignupForm from "../components/register/BusinessSignupForm";
import UserSignupForm from "../components/register/UserSignupForm";
import animal_illust_back from "../../src/style/img/animal_illust_back.svg";

function Signup() {
  // const [loginmode, setLoginMode] = useState(0);
  const [ischecked, setIsChecked] = useState([true, false]);
  const [tab, setTab] = useState("user");

  const SignupTab = [
    { id: 0, text: "일반 회원", category: "USER" },
    { id: 1, text: "사업자 회원", category: "BUSSINESS" },
  ];
  const SignupClickHandler = (i) => {
    const newArr = Array(SignupTab.length).fill(false);
    newArr[i] = true;
    setIsChecked(newArr);
    if (i === 0) {
      setTab("USER");
    } else {
      setTab("BUSSINESS");
    }
  };

  return (
    <Layout>
      <StSignupFormDiv>
        <StSignupContainerdiv>
          <StTitle>회원가입</StTitle>
          {SignupTab?.map((item, i) => (
            <StTabBtn
              key={i}
              checked={ischecked[i]}
              onClick={() => SignupClickHandler(i)}
              className={ischecked[i] ? "selected" : ""}
            >
              {item.text}
            </StTabBtn>
          ))}
          {tab === "USER" ? <UserSignupForm /> : <BusinessSignupForm />}
        </StSignupContainerdiv>
      </StSignupFormDiv>
    </Layout>
  );
}

export default Signup;

const StTabBtn = styled.button`
  width: 331px;
  height: 52px;
  font-size: 24px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px 10px 0 0;
  /* margin-top: 20px; */
  cursor: pointer;
  &:hover {
    background-color: #ffd53f;
    border: 1px solid #d9d9d9;
    font-weight: bold;
  }
  &.selected {
    background-color: #ffd53f;
    font-weight: bold;
  }
`;

const StSignupFormDiv = styled.div`
  width: 1920px;
  height: 1080px;
  margin: auto;
  background-color: #fffcec;
  background-image: url(${animal_illust_back});
  display: flex;
  flex-direction: row;
`;

const StSignupContainerdiv = styled.div`
  margin: 0 auto;
`;

const StTitle = styled.div`
  width: 210px;
  height: 44px;
  font-size: 32px;
  margin: 30px auto;
  text-align: center;
  line-height: 44px;
  font-weight: bold;
`;
