import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import BusinessSignupForm from "../components/register/BusinessSignupForm";
import UserSignupForm from "../components/register/UserSignupForm";
import animal_illust_back from "../../src/style/img/animal_illust_back.svg";

function Signup() {
  // const [loginmode, setLoginMode] = useState(0);
  const [ischecked, setIsChecked] = useState([true, false]);
  const [tab, setTab] = useState("USER");

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
  color: #000000;
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
  @media screen and (max-width: 767px) {
    width: 151px;
    height: 40px;
    font-size: 12px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 251px;
    height: 50px;
    font-size: 20px;
  }
`;

const StSignupFormDiv = styled.div`
  width: 100%;
  height: 1080px;
  margin: auto;
  background-color: #fffcec;
  background-image: url(${animal_illust_back});
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 767px) {
    width: 390px;
    height: 800px;
    background-size: 500px 900px;
    background-position: center top 30px;
    background-repeat: no-repeat;
    background-color: #fffcec;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 768px;
    height: 1024px;
    background-size: 1000px 1000px;
    background-position: center top 180px;
    background-repeat: no-repeat;
    background-color: #fffcec;
  }
`;

const StSignupContainerdiv = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    margin: 0 36px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 134px;
  }
`;

const StTitle = styled.div`
  width: 210px;
  height: 44px;
  font-size: 32px;
  margin: 30px auto;
  text-align: center;
  /* line-height: 44px; */
  font-weight: bold;
  @media screen and (max-width: 767px) {
    width: 80px;
    height: 40px;
    font-size: 20px;
    margin: 30px auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 150px;
    height: 40px;
    font-size: 30px;
    margin: 50px auto;
  }
`;
