import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { NomalLogin } from "../../api/user";
import { removeCookie } from "../../api/cookie";
import Layout from "../common/Layout";
import animal_illust_back from "../../style/img/animal_illust_back.svg";
import styled from "styled-components";
import Swal from "sweetalert2";

function CheckLogin() {
  const logoutmuation = useMutation(NomalLogin, {
    onSuccess: (response) => {
      ["AccessToken", "RefreshToken", "loginType", "email", "nickname", "lat", "lng"].forEach(
        (cookie) => removeCookie(cookie)
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "로그아웃 되었습니다.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
      window.location.href = "/";
    },
  });

  const onLogoutHandler = (e) => {
    e.preventDefault();
    logoutmuation.mutate();
  };
  const navigate = useNavigate();
  return (
    <Layout>
      <StLoginFormDiv>
        <StLoginDiv>
          <StWrap>
            <StText>로그아웃 하시겠습니까?</StText>
            <StBtn onClick={onLogoutHandler}>로그아웃</StBtn>
            <StText>홈페이지를 계속 이용하시겠습니까?</StText>
            <StBtn onClick={() => navigate("/main")}>홈페이지 바로가기</StBtn>
          </StWrap>
        </StLoginDiv>
      </StLoginFormDiv>
    </Layout>
  );
}

export default CheckLogin;

const StLoginFormDiv = styled.div`
  width: 1920px;
  height: 1080px;
  margin: auto;
  display: flex;
  background-image: url(${animal_illust_back});
  @media screen and (max-width: 767px) {
    width: 390px;
    height: 844px;
    background-size: 500px 900px;
    background-position: center top 30px;
    background-repeat: no-repeat;
    background-color: #fffcec;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 768px;
    height: 1024px;
    background-size: 1000px 1000px;
    background-position: center top 80px;
    background-repeat: no-repeat;
    background-color: #fffcec;
  }
`;

const StLoginDiv = styled.div`
  width: 660px;
  height: 580px;
  display: flex;
  background-color: white;
  box-shadow: 1px 1px 15px 0px #ffeba2;
  flex-direction: column;
  margin: 120px auto;
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

const StWrap = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    height: 350px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 400px;
  }
`;

const StText = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`;

const StBtn = styled.button`
  background-color: #fff;
  width: 414px;
  height: 52px;
  margin: 20px 124px 0px 124px;
  font-size: 22px;
  border-radius: 5px;
  color: #000000;
  border: 1px solid #ffd53f;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    background-color: #ffd53f;
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
