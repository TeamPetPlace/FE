import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getMypage, updateUser } from "../../../api/mypage";
import Button from "../../../element/Button";
import {
  StForm,
  StUserBox,
  StInfoTextDiv,
  StInfo,
  StInfoContainer,
  StImg,
  StImgDiv,
  StUserInfoDiv,
  StCancelBtn,
  StNickInput,
  StUploadBtn,
} from "./MypageStyle";
import Swal from "sweetalert2";

function User() {
  const { id } = useParams();
  const [mypage, setMypage] = useState();

  const [cookies] = useCookies(["AccessToken", "loginType"]);

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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "수정이 완료되었습니다.",
      confirmButtonColor: "#FFD53F",
      timer: 3000,
    });
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
                    maxLength={10}
                    onChange={(event) => {
                      setUpdateNick(event.target.value);
                    }}
                  />
                  {cookies.loginType === "BUSINESS" && (
                    <StInfoTextDiv
                      style={{
                        padding: " 5px 10px",
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
                        padding: " 5px 10px",
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
              <Button size="user">수정</Button>
              <StCancelBtn onClick={onEditMode}>취소</StCancelBtn>
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
                    // src={profileOrigin}
                    // alt="origin"
                    // style={{
                    //   width: "330px",
                    //   height: "330px",
                    //   position: "absolute",
                    //   top: "-6%",
                    //   left: "-25px",
                    // }}
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
                          padding: "5px 10px",
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
                          padding: " 5px 10px",
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
                <Button size="user" onClick={onEditMode}>
                  수정
                </Button>
              </StUserBox>
            </>
          )}
        </StUserInfoDiv>
      )}
    </>
  );
}

export default User;
