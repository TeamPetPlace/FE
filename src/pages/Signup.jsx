import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import BusinessSignupForm from "../components/register/BusinessSignupForm";
import UserSignupForm from "../components/register/UserSignupForm";

function Signup() {
  const [loginmode, setLoginMode] = useState(0);

  return (
    <Layout>
      <div>
        <button
          onClick={() => {
            setLoginMode(0);
          }}
        >
          일반회원
        </button>
        <button
          onClick={() => {
            setLoginMode(1);
          }}
        >
          사업자회원
        </button>
      </div>
      <div>{loginmode === 0 ? <UserSignupForm /> : <BusinessSignupForm />}</div>
    </Layout>
  );
}

export default Signup;
