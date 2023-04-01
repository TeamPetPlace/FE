import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMypage, updateUser } from "../../api/mypage";
import profileOrigin from "../../style/img/profile.svg";
// import { StUserInfoDiv } from "./MypageStyle";

function User() {
  const { id } = useParams();
  const [mypage, setMypage] = useState();

  const [cookies] = useCookies(["access_token", "loginType"]);

  const queryClient = useQueryClient();
  const { data } = useQuery("getmypage", getMypage, {
    onSuccess: (response) => {
      setMypage(response.response);
    },
  });

  const onEditMode = () => {
    setEdit(!edit);
    setUpdateNick(mypage.nickname);
    setImage(image);
    setImgView([mypage.image]);
  };

  //수정 모드
  const [edit, setEdit] = useState(false);
  const [updateNick, setUpdateNick] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState([]);
  const fileInput = useRef(null);

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const onImgHandler = (event) => {
    setImgView([]);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        setImage(event.target.files[i]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base = reader.result;
          if (base) {
            const baseSub = base.toString();
            setImgView((imgView) => [...imgView, baseSub]);
          }
        };
      }
    }
  };

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("getmypage");
    },
  });

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nickname", updateNick);
    formData.append("image", image);
    const payload = {
      id: id,
      nickname: updateNick,
      image: image,
    };
    updateMutation.mutate(payload);
    onEditMode();
    alert("수정 완료");
  };

  return (
    <>
      {edit ? (
        <StForm onSubmit={onUpdateHandler} encType="multipart/form-data">
          <StUserInfoDiv>
            <div style={{ position: "relative" }}>
              <StUploadBtn onClick={onImgButton}>+</StUploadBtn>
            </div>
            <input
              type="file"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={onImgHandler}
            />
            <div style={{ position: "relative" }}>
              <StImgDiv>
                {imgView.length > 0 &&
                  imgView?.map((item, index) => {
                    return (
                      <StImg
                        src={item}
                        alt="img"
                        key={index}
                        style={{ zIndex: "999" }}
                      />
                    );
                  })}
              </StImgDiv>
            </div>
            <StUserBox>
              <StInfoContainer>
                <StInfo>
                  <StInfoTextDiv>닉네임</StInfoTextDiv>
                  <StNickInput
                    type="text"
                    name="nick"
                    value={updateNick}
                    onChange={(event) => {
                      setUpdateNick(event.target.value);
                    }}
                  />
                  {cookies.loginType === "BUSINESS" && (
                    <StInfoTextDiv
                      style={{
                        padding: " 5px 15px",
                        borderRadius: "10px",
                        backgroundColor: "#ffd53f",
                      }}
                    >
                      사업자
                    </StInfoTextDiv>
                  )}
                  {cookies.loginType === "USER" && (
                    <StInfoTextDiv
                      style={{
                        padding: " 5px 15px",
                        borderRadius: "10px",
                        backgroundColor: "#ffd53f",
                      }}
                    >
                      회원
                    </StInfoTextDiv>
                  )}
                </StInfo>
                {mypage && (
                  <StInfo>
                    <StInfoTextDiv>이메일</StInfoTextDiv>
                    <StInfoTextDiv>{mypage.email}</StInfoTextDiv>
                  </StInfo>
                )}
              </StInfoContainer>
              <StEditBtn
                style={{
                  margin: "0 10px 0 227px",
                }}
              >
                수정
              </StEditBtn>
              <StEditBtn onClick={onEditMode}>취소</StEditBtn>
            </StUserBox>
          </StUserInfoDiv>
        </StForm>
      ) : (
        // 수정 전 모드
        <StUserInfoDiv>
          {mypage && (
            <>
              <div style={{ position: "relative" }}>
                <StImgDiv>
                  {mypage.image === null ? (
                    <StImg
                      src={profileOrigin}
                      alt="origin"
                      style={{
                        width: "330px",
                        height: "330px",
                        position: "absolute",
                        top: "-6%",
                        left: "-23px",
                      }}
                    />
                  ) : (
                    <StImg src={mypage.image} alt="img" />
                  )}
                </StImgDiv>
              </div>
              <StUserBox>
                <StInfoContainer>
                  <StInfo>
                    <StInfoTextDiv>닉네임 </StInfoTextDiv>
                    <StInfoTextDiv>{mypage.nickname}</StInfoTextDiv>
                    {cookies.loginType === "BUSINESS" && (
                      <StInfoTextDiv
                        style={{
                          padding: " 5px 15px",
                          borderRadius: "10px",
                          backgroundColor: "#ffd53f",
                        }}
                      >
                        사업자
                      </StInfoTextDiv>
                    )}
                    {cookies.loginType === "USER" && (
                      <StInfoTextDiv
                        style={{
                          padding: " 5px 15px",
                          borderRadius: "10px",
                          backgroundColor: "#ffd53f",
                        }}
                      >
                        회원
                      </StInfoTextDiv>
                    )}
                  </StInfo>
                  <StInfo>
                    <StInfoTextDiv>이메일 </StInfoTextDiv>
                    <StInfoTextDiv>{mypage.email}</StInfoTextDiv>
                  </StInfo>
                </StInfoContainer>
                <StEditBtn
                  style={{
                    margin: "0 227px",
                  }}
                  onClick={onEditMode}
                >
                  수정
                </StEditBtn>
              </StUserBox>
            </>
          )}
        </StUserInfoDiv>
      )}
    </>
  );
}

export default User;

const StForm = styled.form`
  display: flex;
`;

const StUserBox = styled.div`
  width: 883px;
  height: 202px;
  border: none;
  margin: auto;
  font-size: 22px;
  border-radius: 5px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #ffffff;
  box-shadow: 1px 1px 15px 0px #d9d9d9;
  @media screen and (max-width: 767px) {
    width: 330px;
    height: 100px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 600px;
    height: 150px;
  }
`;

const StInfoTextDiv = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 5px;
  padding: 5px 0;
  /* font-size: ${(props) => props.fontSize}; */
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const StInfo = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 200px;
    margin-left: -100px;
    margin-top: -15px;
    height: 30px;
    margin-bottom: -10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    margin-top: -10px;
  }
`;

const StInfoContainer = styled.div`
  flex-direction: column;
  margin: 35px 227px 5px 227px;
`;

const StImg = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 100%;
  z-index: 99;
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 200px;
    height: 200px;
  }
`;

const StImgDiv = styled.div`
  position: absolute;
  z-index: 99;
  width: 280px;
  height: 280px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 280px;
  top: -10%;
  box-shadow: 3px 3px 3px 0px #d9d9d9;

  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
    top: 20%;
    left: -10px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 200px;
    height: 200px;
    top: 5%;
  }
`;

const StUserInfoDiv = styled.div`
  margin: 118px auto 0 auto;
  width: 996px;
  height: 225px;
  display: flex;
  border: none;
  @media screen and (max-width: 767px) {
    width: 300px;
    margin-left: 20px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 700px;
    margin-left: 50px;
  }
`;

const StEditBtn = styled.button`
  border-radius: 5px;
  border: 1px solid #6d6d6d;
  background-color: white;
  font-size: 18px;
  width: 64px;
  height: 34px;
  cursor: pointer;
  &:hover {
    background-color: #6d6d6d;
  }
  @media screen and (max-width: 767px) {
    font-size: 10px;
    height: 20px;
    width: 40px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    height: 30px;
    width: 60px;
  }
`;

const StNickInput = styled.input`
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background-color: white;
  font-size: 22px;
  width: 120px;
  text-indent: 5px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 80px;
    height: 20px;
  }
`;

const StUploadBtn = styled.button`
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  position: absolute;
  z-index: 999;
  top: 5%;
  left: 40px;
  margin-top: 180px;
  margin-left: 150px;
  background-color: #ffffff;
  box-shadow: 3px 3px 3px 0px #d9d9d9;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
    font-size: 15px;
    top: -15%;
    left: -80px;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    top: 0%;
    left: -10px;
  }
`;
